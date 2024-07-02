import fs from 'node:fs';
import path from 'node:path';
import { Router } from 'express';

const router = Router();

const files = fs.readdirSync(__dirname);

files.forEach((fileOrDir) => {
  const isDir = fs.statSync(path.join(__dirname, fileOrDir)).isDirectory();

  if (!isDir) {
    return;
  }

  const route = require(`./${fileOrDir}`);

  router.use(`/${fileOrDir}`, route.default);
});

export default router;
