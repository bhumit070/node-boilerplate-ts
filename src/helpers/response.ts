import { errorLogger, successLogger } from '../server/logger';
import type { Response } from 'express';
interface IResponseGenerator {
	status?: number,
	error?: any,
	message?: string
	data?: unknown
}

function getStatusCode(error: { code?: number; statusCode?: number; status?: number; isJoi?: boolean; } , status?: number) {
	if(status) {
		return status;
	}

	if(!status && !error) {
		return 200;
	}

	if(error) {
		let status;
		if(Number(error.code)) {
			status = error.code;
		} else  if(Number(error.statusCode)) {
			status = error.statusCode;
		} else if (Number(error.status)) {
			status = error.status;
		} else if(error.isJoi) {
			status = 422;
		}
		return status || 500;
	}
	return 200;
}

export function responseGenerator({ status, error, message, data = []}: IResponseGenerator) {
	return {
		status: getStatusCode(error, status),
		error: error ? true : false,
		message: message ? message : 
						 error ? error.message : 
						 error ? 'Internal Server Error' : 'Success',
		data: error && error.isJoi ? error : data
	};
}

export class CustomResponse {
	constructor(private readonly res: Response) {
		this.res = res;
	}

	send({ status, error, message, data = []}: IResponseGenerator) {
		const response = responseGenerator({ status, error, message, data });
		if(response.error) {
			errorLogger.error({...response});
		} else {
			successLogger.info({...response});
		}
		return this.res.status(response.status).json(response);
	}

}

export class CustomError {
	constructor({ error, message = 'Internal Server Error', status = 500 }: Pick<IResponseGenerator, 'error' | 'message' | 'status'>) {
		const customError  = new Error(message) as Error & { code?: number };
		customError.code = error && error?.isJoi ? 422 : status;
		throw customError;
	}
}