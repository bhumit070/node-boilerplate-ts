import { Request, Response } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { logger, response } from '../../../helpers';

export async function uploadFile(req: Request, res: Response) {
  const [_, fileExtension] = req.file?.mimetype.split('/')!;

  fs.writeFile(
    path.join(__dirname, 'example.' + fileExtension),
    req.file?.buffer!
  );
  response.success({ res });
}
