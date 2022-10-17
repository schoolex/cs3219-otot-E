import mongoose, { Connection, createConnection } from 'mongoose';
import config from '../config';
import { logger } from '../loggers/logger';

const connect = async (): Promise<void> => {
  const dbUrl = config.database.url;
  try {
    mongoose.connect(dbUrl, { dbName: config.database.name });
    logger.info(`Connected to MongoDB at ${dbUrl}`);
  } catch (err) {
    logger.error(`Could not connect to MongoDB at ${dbUrl} `, err);
  }
};

const database = {
  connect,
};

export { database as default };
