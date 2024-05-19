import { errorLogger, successLogger } from '../server/logger';
import type { Response } from 'express';
import { ZodError } from 'zod';

interface IResponseGenerator {
  status?: number;
  error?: any;
  message?: string;
  data?: unknown;
}

function getStatusCode(
  error: {
    code?: number;
    statusCode?: number;
    status?: number;
    isJoi?: boolean;
  },
  status?: number
) {
  if (status) {
    return status;
  }

  if (!status && !error) {
    return 200;
  }

  if (error) {
    let status;
    if (Number(error.code)) {
      status = error.code;
    } else if (Number(error.statusCode)) {
      status = error.statusCode;
    } else if (Number(error.status)) {
      status = error.status;
    } else if (error.isJoi) {
      status = 422;
    }
    return status || 500;
  }
  return 200;
}

export function formatZodResponse(error: ZodError) {
  const obj: Record<string, string> = {};
  error.issues.forEach((issue) => {
    let message = issue.message;
    const path = issue.path[0];

    switch (issue.code) {
      case 'too_small':
        message = `${path} must contain ${issue.minimum} or more characters`;
        break;
      case 'too_big':
        message = `${path} must contain ${issue.maximum} or less characters`;
      default:
      case 'invalid_type':
      case 'invalid_string':
        message = `${path} is not valid`;
        break;
    }

    if (issue.message === message) {
      if (issue.message === 'Required') {
        message = `${path} is required`;
      }
    }
    if (obj[path]) {
      message = `${obj[path]}, ${message}`;
    }
    obj[path] = message;
  });

  for (const key in obj) {
    obj[key] = `${obj[key]}.`;
  }

  return obj;
}

export function responseGenerator({
  status,
  error,
  message,
  data = [],
}: IResponseGenerator) {
  if (error instanceof ZodError) {
    status = 422;
    message = 'Invalid data provided';
    data = formatZodResponse(error);
  } else {
    status = getStatusCode(error, status);
  }
  return {
    status,
    error: error ? true : false,
    message: message
      ? message
      : error
      ? error.message
      : error
      ? 'Internal Server Error'
      : 'Success',
    data: error && error.isJoi ? error : data,
  };
}

export class CustomResponse {
  constructor(private readonly res: Response) {
    this.res = res;
  }

  send({ status, error, message, data = [] }: IResponseGenerator) {
    const response = responseGenerator({ status, error, message, data });
    if (response.error) {
      errorLogger.error({ ...response });
    } else {
      successLogger.info({ ...response });
    }
    return this.res.status(response.status).json(response);
  }
}

export class CustomError {
  constructor({
    error,
    message = 'Internal Server Error',
    status = 500,
  }: Pick<IResponseGenerator, 'error' | 'message' | 'status'>) {
    const customError = new Error(message) as Error & { code?: number };
    customError.code = error instanceof ZodError ? 422 : status;
    throw customError;
  }
}
