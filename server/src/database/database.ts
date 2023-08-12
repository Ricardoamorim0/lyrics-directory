import postgres from 'pg';
import bcrypt from 'bcrypt';
import constants from '../constants/constants.js';


let client: postgres.PoolClient;

function set(db_client: postgres.PoolClient): void { client = db_client; }

async function createUser(name: string, email: string, password: string): Promise<{ userExist: boolean }> {

  const res = await checkIfUserExists(email);

  if (res) return { userExist: true };

  bcrypt.hash(password, constants.SALT_ROUNDS).then(async (hash: string) => {
    client.query('INSERT INTO users(name, email, password) VALUES ($1,$2,$3);', [name, email, hash]);
  });

  return { userExist: false };
}

async function isUserPassword(email: string, password: string): Promise<{ userExist: boolean, result: boolean, email: string }> {
  const queryResult = await client.query('SELECT password FROM users WHERE email=$1 LIMIT 1;', [email]);

  if (queryResult.rowCount <= 0) return { userExist: false, result: false, email: ''};

  return { userExist: true, result: await bcrypt.compare(password, queryResult.rows[0].password).then((result) => result), email: queryResult.rows[0].email};
}

async function checkIfUserExists(email: string): Promise<boolean> {
  const res = await client.query('SELECT email FROM users WHERE email=$1 LIMIT 1', [email]);
  
  return res.rowCount > 0;
}

export default { set, createUser, isUserPassword, checkIfUserExists };