import { Router } from 'express';
import { PromiseHandler } from '../common/middlewares';
import { uploadFile } from './controllers';
const router = Router();

router.post('/upload', PromiseHandler(uploadFile));

export default router;
