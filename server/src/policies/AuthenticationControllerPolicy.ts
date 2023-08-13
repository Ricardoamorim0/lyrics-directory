import { Request, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import constants from '../constants/constants.js';

const RegisterSchema = Joi.object({
  name: Joi.string().min(constants.MIN_NAME_LENGTH).max(constants.MAX_NAME_LENGTH).pattern(new RegExp('^[a-zA-Z ]+$')).required(),
  email: Joi.string().min(constants.MIN_EMAIL_LENGTH).max(constants.MAX_EMAIL_LENGTH).email().required(),
  password: Joi.string().min(constants.MIN_PASSWORD_LENGTH).max(constants.MAX_PASSWORD_LENGTH).required()
});

const LoginSchema = Joi.object({
  email: Joi.string().min(constants.MIN_EMAIL_LENGTH).max(constants.MAX_EMAIL_LENGTH).email().required(),
  password: Joi.string().min(constants.MIN_PASSWORD_LENGTH).max(constants.MAX_PASSWORD_LENGTH).required()
});

export default {
  register (req: Request, res: Response, next: () => void) {

    const { error } = RegisterSchema.validate(req.body);

    if (error) {
      switch (error.details[0].context?.key) {
      case 'name':
        res.status(400).json({
          title: 'Invalid name',
          message: 'You must provide a valid name.'
        });
        break;
      case 'email':
        res.status(400).json({
          title: 'Invalid email',
          message: 'You must provide a valid email address.'
        });
        break;
      case 'password':
        res.status(400).json({
          title: 'Invalid password',
          message: 'You must provide a valid password.'
        });
        break;
      default:
        res.status(400).json({
          title: 'Invalid data',
          message: 'You must provide valid registration information.'
        });
        break;
      }
    } else {
      next();
    }
  },

  login (req: Request, res: Response, next: () => void) {

    const { error } = LoginSchema.validate(req.body);

    if (error) {
      switch (error.details[0].context?.key) {
      case 'email':
        res.status(400).json({
          title: 'Invalid email',
          message: 'You must provide a valid email address.'
        });
        break;
      case 'password':
        res.status(400).json({
          title: 'Invalid password',
          message: 'You must provide a valid password.'
        });
        break;
      default:
        res.status(400).json({
          title: 'Invalid data',
          message: 'You must provide valid registration information.'
        });
        break;
      }
    } else {
      next();
    }
  },

  async auth (req: Request, res: Response, next: () => void) {
    jwt.verify(req.body.token, constants.JWT_TOKEN_SECRET, { ignoreExpiration: false }, (error) => {
      if (error) {
        res.status(401).json({
          message: error.message
        });
      } else {
        next();
      }
    });
  }

};