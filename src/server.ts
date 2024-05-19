import dotenv from 'dotenv';
dotenv.config();

//import './db/mongodb';
//import './db/redis';
import './db/sql';

import express, { Request, Response } from 'express';
import http from 'http';
import serverMiddlewares from './server/middlewares';
import serverRoutes from './modules/routes';

import { logger } from './server/logger';
import { responseHelpers } from './helpers';

const app = express();
const server = http.createServer(app);


serverMiddlewares(app);
serverRoutes(app);
app.use(((req: Request, res: Response) => {
  return new responseHelpers.CustomResponse(res).send({
    error: true,
    message: 'Route not found',
    status: 404,
  });
}));
//require('./socket')(server);


const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}. 🚀`);
});