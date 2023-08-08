import { Express, Request, Response } from 'express';
import postgres from 'pg';
import constants from '../constants/constants.js';
import 'dotenv/config';

import db from '../database/database.js';

export default (app: Express, client: postgres.PoolClient) => {

  // Set database client
  db.set(client);


  // Routes
  app.post('/register', (req: Request, res: Response) => {

    if (typeof req.body.name === 'string' &&
    typeof req.body.email === 'string' &&
    typeof req.body.password === 'string') {

      const name = req.body.name.trim();
      const email = req.body.email.trim();
      const password = req.body.password.trim();
      
      if (name.length >= constants.MIN_NAME_LENGTH && email.length >= constants.MIN_EMAIL_LENGTH && password.length >= constants.MIN_PASSWORD_LENGTH) {
        if (name.length <= constants.MAX_NAME_LENGTH && email.length <= constants.MAX_EMAIL_LENGTH && password.length <= constants.MAX_PASSWORD_LENGTH) {
          return db.checkIfUserExists(email).then((userExists) => {
            if (userExists) {
              res.json(output(false, 'db_cu_0'));
            } else {
              db.createUser(name, email, password);
              res.json(output(true, 'done'));
            }
          }).catch((error) => {
            res.json(output(false, 'unknown'));
            console.log(error);
          });
        }
      }
    }

    res.json(output(false, 'db_0'));
    
  });

  app.post('/login', (req: Request, res: Response) => {

    if (typeof req.body.email === 'string' &&
    typeof req.body.password === 'string') {

      const email = req.body.email.trim();
      const password = req.body.password.trim();

      if (email.length >= constants.MIN_EMAIL_LENGTH && password.length > 0) {
        return db.checkIfUserExists(email).then((userExists: boolean) => {
          if (!userExists) {
            res.json(output(false, 'db_lu_0'));
            return;
          }

          return db.isUserPassword(email, password).then((isUserPassword: boolean) => {
            res.json(isUserPassword? output(true, 'done') : output(false, 'db_lu_0'));
            return;
          }).catch((error) => { throw error; });
        }).catch((error) => {
          res.json(output(false, 'unknown'));
          console.log(error);
        });
      }
    }

    res.json(output(false, 'db_0'));
  });

};

function output(success: boolean, errorCode: string): { success: boolean, error: string, message: string } {
  return {success: success, error: errorCode, message: constants.ERRORS[errorCode] || ''};
}