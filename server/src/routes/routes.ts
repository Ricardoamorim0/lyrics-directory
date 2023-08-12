import { Express } from 'express';
import { PoolClient } from 'pg';
import AuthenticationController from '../controllers/AuthenticationController.js';
import AuthenticationControllerPolicy from '../policies/AuthenticationControllerPolicy.js';

import db from '../database/database.js';

export default (app: Express, client: PoolClient) => {

  // Set database client
  db.set(client);


  // Routes
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register);
  app.post('/login', AuthenticationControllerPolicy.login, AuthenticationController.login);

};