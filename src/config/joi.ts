import { ValidationOptions } from 'joi';

export const defaultConfig: ValidationOptions = {
	abortEarly: false,
	allowUnknown: false,
	stripUnknown: true,
	cache: true,
};