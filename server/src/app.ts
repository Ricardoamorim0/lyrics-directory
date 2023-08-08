import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import postgres from 'pg';
import constants from './constants/constants.js';
import 'dotenv/config';

import routes from './routes/routes.js';

const app: Express = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const pool = new postgres.Pool({ connectionString: constants.DB_CONNECTION_STRING });
pool.connect().then(client => {
  routes(app, client);
}).catch(error => {
  console.log(error);
});

app.listen(constants.PORT);