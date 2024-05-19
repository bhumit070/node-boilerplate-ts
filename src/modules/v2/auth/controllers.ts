import { joiConfig  } from '../../../config';
import { UserModel } from '../../../db/mongodb/models';
import { authHelpers } from '../../../helpers';
import { responseHelpers }  from '../../../helpers';
import { loginSchema, registerSchema, ILoginSchema, IRegisterSchema } from './validators';
import { IUser } from '../../../db/mongodb/models/users.model';
import type { Request, Response } from 'express';
import { prisma } from '../../../db/sql';

const { CustomError, CustomResponse } = responseHelpers;

export async function login(req: Request, res: Response) {
	try {
		const value: ILoginSchema = await loginSchema.validateAsync(req.body, joiConfig.defaultConfig);

		const user = await UserModel.findOne({ email: value.email }).lean();

		if(!user) {
			throw new CustomError({ message: 'User not found.!', status: 404 });
		}

		if(user.password !== value.password) {
			throw new CustomError({ message: 'Invalid credentials.!', status: 401 });
		}

		const token = authHelpers.encodeToken(user);
		
		return new CustomResponse(res).send({ data: { user, token } } );
	} catch (error) {
		return new CustomResponse(res).send({ error });
	}
}

export async function register(req: Request, res: Response) {
	try {
		const value: IRegisterSchema = await registerSchema.validateAsync(req.body, joiConfig.defaultConfig);

		const existingUser = await UserModel.findOne({ email: value.email }).lean();

		if(existingUser) {
			throw new CustomError({ message: 'User already exists.!', status: 409 });
		}

		const createdUser = await UserModel.create(value);
		const data = {
			user: createdUser
		};
		return new CustomResponse(res).send({ data, status: 201 } );
	} catch (error) {
		return new CustomResponse(res).send({ error });
	}
}

export async function loginSQL(req: Request, res: Response) {
	try {
		const value: ILoginSchema = await loginSchema.validateAsync(req.body, joiConfig.defaultConfig);

		const user = await prisma.user.findFirst({
			where: {
				email: value.email
			}
		});

		if(!user) {
			throw new CustomError({ message: 'User not found.!', status: 404 });
		}

		if(user.password !== value.password) {
			throw new CustomError({ message: 'Invalid credentials.!', status: 401 });
		}

		const token = authHelpers.encodeToken(user);

		return new CustomResponse(res).send({ data: { user, token } } );

	} catch (error) {
		return new CustomResponse(res).send({ error });
	}
}

export async function registerSQL(req: Request, res: Response) {
	try {
		const value: IRegisterSchema = await registerSchema.validateAsync(req.body, joiConfig.defaultConfig);

		const existingUser: IUser | null = await prisma.user.findFirst({
			where: {
				email: value.email
			}
		});

		if(existingUser) {
			throw new CustomError({ message: 'User already exists.!', status: 409 });
		}

		const createdUser = await prisma.user.create({
			data: value
		});

		const data = {
			user: createdUser
		};

		return new CustomResponse(res).send({ data, status: 201 } );
	} catch (error) {
		return new CustomResponse(res).send({ error });
	}
}