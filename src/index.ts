import './config/index';

import express from 'express';
import { config } from './config/index';
import { registerMiddlewares, registerRoutes } from './middlewares';
import { logger } from './helpers';

Promise.all([]).then(bootstrapServer).catch(handleServerInitError);

function bootstrapServer() {
  const app = express();

  const PORT = config.PORT;

  registerMiddlewares(app);
  registerRoutes(app);

  app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
  });
}

function handleServerInitError(e: unknown) {
  logger.error('Error initializing server:', e);
}

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
});
