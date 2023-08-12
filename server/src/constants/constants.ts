import 'dotenv/config';

export default {
  PORT: process.env.PORT || 8081,
  DB_CONNECTION_STRING: `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,

  SALT_ROUNDS: 11,


  MIN_NAME_LENGTH: Number(process.env.MIN_NAME_LENGTH || 3),
  MIN_EMAIL_LENGTH: Number(process.env.MIN_EMAIL_LENGTH || 5),
  MIN_PASSWORD_LENGTH: Number(process.env.MIN_PASSWORD_LENGTH || 5),

  MAX_NAME_LENGTH: Number(process.env.MAX_NAME_LENGTH || 50),
  MAX_EMAIL_LENGTH: Number(process.env.MAX_EMAIL_LENGTH || 320),
  MAX_PASSWORD_LENGTH: Number(process.env.MAX_PASSWORD_LENGTH || 50),

  JWT_TOKEN_EXPIRE: 60 * 60 * 24 * 7, // 1 week
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || 'notfound'
};