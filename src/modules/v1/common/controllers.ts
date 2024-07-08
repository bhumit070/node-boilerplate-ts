import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../../errors/error';
import { response } from '../../../helpers/';
import { CustomResponse } from '../../../helpers/response';
import { ZodError } from 'zod';
import { config } from '../../../config';

export function routeNotFound() {
  throw new CustomError('Route not found', 404);
}

export function handleApiError(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const payload = {
    code: 500,
    res,
    message: 'Internal server error',
    data: config.NODE_ENV === 'DEVELOPMENT' ? error.stack : null,
  } as Required<CustomResponse>;

  if (error instanceof CustomError) {
    payload.message = error.message;
    payload.code = error.code;
  }

  if (error instanceof ZodError) {
    payload.code = 422;
    payload.message = `Invalid data provided.`;
    let data: Record<string, string> = {};
    for (const key in error.formErrors.fieldErrors) {
      data[key] =
        error.formErrors.fieldErrors[key]?.join(', ') || 'Invalid input.';
    }
    payload.data = data;
  }

  response.error(payload);
}
