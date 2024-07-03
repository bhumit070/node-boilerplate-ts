import { NextFunction, Request, Response } from 'express';

export function PromiseHandler(
  callback: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
}
