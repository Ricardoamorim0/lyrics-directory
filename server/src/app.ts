import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes/routes.js';

const app: Express = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

routes(app);

app.listen(process.env.PORT ||  8081);