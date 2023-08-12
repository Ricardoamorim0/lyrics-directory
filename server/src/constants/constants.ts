import 'dotenv/config';

export default {
  PORT: process.env.PORT || 8081,
  DB_CONNECTION_STRING: `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,

  SALT_ROUNDS: 11,


  MIN_NAME_LENGTH: Number(process.env.MIN_NAME_LENGTH || 3),
  MIN_EMAIL_LENGTH: Number(process.env.MIN_EMAIL_LENGTH || 5),
  MIN_PASSWORD_LENGTH: Number(process.env.MIN_PASSWORD_LENGTH || 5),

  MAX_NAME_LENGTH: Number(process.env.MAX_NAME_LENGTH || 50),
  MAX_EMAIL_LENGTH: Number(process.env.MAX_EMAIL_LENGTH || 150),
  MAX_PASSWORD_LENGTH: Number(process.env.MAX_PASSWORD_LENGTH || 50),


  ERRORS: {
    'done': 'Done',
    'unknown': 'Unknown Error',

    // Database
    'db_0': 'Incorrect data format. Try again.',

    // Database - Create User
    'db_cu_0': 'User already exists. If it\'s not you, try a different email.',

    // Database - Login User
    'db_lu_0': 'Incorrect email or password. Your password or email don\'t match with our database.'
  } as { [key: string]: string; }
};