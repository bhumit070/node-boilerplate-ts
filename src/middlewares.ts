import express, { Application, NextFunction, Request, Response } from 'express';

import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
import multer from 'multer';
import cors from 'cors';

import { handleApiError, routeNotFound } from './modules/v1/common/controllers';
import routes from './modules';
import { config } from './config';

export function registerMiddlewares(app: Application) {
  app
    .use(express.json())
    .use(hpp({}))
    .use(helmet())
    .use(morgan('dev'))
    .use(
      cors({
        origin:
          config.ALLOWED_ORIGINS === '*'
            ? config.ALLOWED_ORIGINS
            : config.ALLOWED_ORIGINS.split(','),
        credentials: true,
      })
    )
    .use(multer().single('file'))
    .disable('x-powered-by');
}

export function registerRoutes(app: Application) {
  app.use('/api', routes).use(routeNotFound).use(handleApiError);
}
