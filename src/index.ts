import './config/index';

import express from 'express';
import { config } from './config/index';
import { registerMiddlewares, registerRoutes } from './middlewares';

Promise.all([]).then(bootstrapServer).catch(handleServerInitError);

function bootstrapServer() {
  const app = express();

  const PORT = config.PORT;

  registerMiddlewares(app);
  registerRoutes(app);

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

function handleServerInitError(e: unknown) {
  console.log('Error initializing server:', e);
}

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception:', error);
});
