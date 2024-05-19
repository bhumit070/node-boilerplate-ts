import Joi from 'joi';

export interface ILoginSchema {
	email: string,
	password: string
}

export interface IRegisterSchema {
	name: string,
	email: string,
	password: string
}

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required().min(8).max(30).alphanum()
});

export const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required().min(8).max(30).alphanum()
});
