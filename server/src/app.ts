import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app: Express = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/status', (req: Request, res: Response) => {
  res.json({
    message: 'Server Online'
  });
});

app.listen(process.env.PORT ||  8081);