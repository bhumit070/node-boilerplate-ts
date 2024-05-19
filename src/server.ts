import dotenv from 'dotenv';
dotenv.config();

import './db/mongodb';
import './db/redis';
import './db/sql';

import express, { Response } from 'express';
import http from 'http';
import serverMiddlewares from './server/middlewares';
import serverRoutes from './modules/routes';

import { logger } from './server/logger';
import { responseHelpers } from './helpers';
import { errorHandler } from './helpers/handlers';

const app = express();
const server = http.createServer(app);

serverMiddlewares(app);
serverRoutes(app);
app.use((_, res: Response) => {
  return new responseHelpers.CustomResponse(res).send({
    error: true,
    message: 'Route not found',
    status: 404,
  });
});
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}. 🚀`);
});
