import { config } from 'dotenv';
import express from 'express';
import './database';
import { configServerApp } from './config/server';
import { routes } from './routes';
import { logger } from './logs';
import { swagger } from './docs';

config({
  path:
    process.env.NODE_ENV === 'dev'
      ? '.env.dev'
      : process.env.NODE_ENV === 'test'
      ? '.env.test'
      : '.env',
});
console.log(process.env.NODE_ENV);
export const app = express();

app.set(
  logger.log({
    level: 'info',
    message: `Started 🔺 on ${process.env.HOST}:${process.env.PORT} || ${process.env.POSTGRES_HOST}`,
  })
);

app.use(configServerApp);
app.use('/users', routes);
app.use(swagger);
