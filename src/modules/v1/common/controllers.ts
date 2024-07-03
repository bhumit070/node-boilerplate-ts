import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../../errors/error';
import { response } from '../../../helpers/';
import { CustomResponse } from '../../../helpers/response';
import { ZodError } from 'zod';

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
    data: {
      message: 'Internal server error',
    },
  } as Required<CustomResponse>;

  if (error instanceof CustomError) {
    payload.data.message = error.message;
    payload.code = error.code;
  }

  if (error instanceof ZodError) {
    payload.code = 422;
    payload.data.message = `Invalid data provided.`;
    let data: Record<string, string> = {};
    for (const key in error.formErrors.fieldErrors) {
      data[key] =
        error.formErrors.fieldErrors[key]?.join(', ') || 'Invalid input.';
    }
    payload.data.data = data;
  }

  response.error(payload);
}
