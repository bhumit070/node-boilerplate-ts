import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

function registerAppMiddlewares(app: Application) {
	app
		.use(express.json())
		.use(express.urlencoded({ extended: true }))
		.use(cors())
		.use(morgan('dev'));
}

export default registerAppMiddlewares;

