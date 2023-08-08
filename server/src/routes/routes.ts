import { Express, Request, Response } from 'express';
export default (app: Express) => {

  app.post('/register', (req: Request, res: Response) => {
    res.json({
      message: 'User have been registered!'
    });
  });

  app.post('/login', (req: Request, res: Response) => {
    res.json({
      message: 'User tried to login!'
    });
  });

};