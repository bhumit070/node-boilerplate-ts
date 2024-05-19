import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { responseHelpers } from '../helpers';

function registerAppMiddlewares(app: Application) {
	app
		.use(express.json())
		.use(express.urlencoded({ extended: true }))
		.use(cors())
		.use(morgan('dev'))
		.use(((req: Request, res: Response) => {
			return new responseHelpers.CustomResponse(res).send({
				error: true,
				message: 'Route not found',
				status: 404,
			});
		}));
}

export default registerAppMiddlewares;

