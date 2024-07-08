import fs from 'node:fs';
import path from 'node:path';
import { Router } from 'express';

const router = Router();

const isDirScanned: Record<string, boolean> = {};
const routesFileName = 'routes.ts';
function registerRoutes(currentDir = __dirname) {
  const files = fs.readdirSync(currentDir);

  for (let i = 0; i < files.length; i += 1) {
    const name = files[i];

    const fullPath = path.join(currentDir, name);

    const stats = fs.statSync(fullPath);

    if (!stats.isDirectory()) {
      continue;
    }

    const routesFilePath = path.join(fullPath, routesFileName);

    const isRoutesFileExistOnThisDirectory = fs.existsSync(routesFilePath);

    if (isRoutesFileExistOnThisDirectory) {
      let prefix = routesFilePath
        .replace(__dirname, '')
        .replace(routesFileName, '')
        .slice(0, -1);

      router.use(prefix, require(routesFilePath).default);
    }

    registerRoutes(path.join(currentDir, name));
  }
}

registerRoutes();

export default router;
