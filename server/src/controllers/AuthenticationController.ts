import { Request, Response } from 'express';
import db from '../database/database.js';
import jwt from 'jsonwebtoken';
import constants from '../constants/constants.js';

function jwtSignUser(user: { id: number, name: string, email: string }): string {
  const EXPIRE_TIME = constants.JWT_TOKEN_EXPIRE;
  return jwt.sign(user, constants.JWT_TOKEN_SECRET, { expiresIn: EXPIRE_TIME });
}

export default {
  async register (req: Request, res: Response) {

    return await db.createUser(req.body.name, req.body.email, req.body.password)
      .then(async (result: { userExist: boolean }) => {
        if (!result.userExist) {
          res.status(201).json({});
        } else {
          res.status(400).json({
            title: 'User already exists',
            message: 'If it\'s not you, try a different email.'
          });
        }
      }).catch((error) => {
        console.log(error);
        res.status(400).json({
          title: 'Unknown error',
          message: 'Try again.'
        });
      });
    
  },

  async login (req: Request, res: Response) {

    return await db.isUserPassword(req.body.email, req.body.password)
      .then((result: { userExist: boolean, result: boolean, data: { id: number, name: string, email: string } }) => {
        if (result.userExist && result.result) {
          res.status(200).json({
            user: result.data,
            token: jwtSignUser(result.data)
          });
        } else {
          res.status(400).json({
            title: 'Incorrect email or password',
            message: 'Your password or email don\'t match with our database.'
          });
        }
        
      }).catch((error) => {
        console.log(error);
        res.status(400).json({
          title: 'Unknown error',
          message: 'Try again.'
        });
      });

  }
};