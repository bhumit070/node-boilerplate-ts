import { NextFunction, Request, Response } from 'express';
import { CustomResponse } from './response';

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  _next: NextFunction
) {
  return new CustomResponse(res).send({
    error: true,
    message: 'Something went wrong, please try again later.',
    status: 500,
  });
}
