import * as express from 'express';
import config from './config';
import loaders from './loaders';
import { logger } from './loggers/logger';

const main = async () => {
  const app = express.default();
  await loaders(app);

  app.listen(config.port, () => {
    logger.info(`Server is listening on port ${config.port}`);
  });
};

main();
