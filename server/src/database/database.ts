import postgres from 'pg';
import bcrypt from 'bcrypt';
import constants from '../constants/constants.js';


let client: postgres.PoolClient;

function set(db_client: postgres.PoolClient): void { client = db_client; }

async function createUser(name: string, email: string, password: string): Promise<void> {
  bcrypt.hash(password, constants.SALT_ROUNDS).then(async (hash: string) => {
    await client.query('INSERT INTO users(name, email, password) VALUES ($1,$2,$3);', [name, email, hash]);
  });
}

async function isUserPassword(email: string, password: string): Promise<boolean> {
  const queryResult = await client.query('SELECT password FROM users WHERE email=$1 LIMIT 1;', [email]);

  if (queryResult.rowCount <= 0) return false;

  return await bcrypt.compare(password, queryResult.rows[0].password).then((result) => result);
}

async function checkIfUserExists(email: string): Promise<boolean> {
  const res = await client.query('SELECT email FROM users WHERE email=$1 LIMIT 1', [email]);
  
  return res.rowCount > 0;
}

export default { set, createUser, isUserPassword, checkIfUserExists };