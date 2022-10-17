import * as express from 'express';
import database from './database';
import server from './server';

export default async (app: express.Application) => {
  await database.connect();
  server(app);
};
