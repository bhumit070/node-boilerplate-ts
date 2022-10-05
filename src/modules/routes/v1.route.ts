import { Router } from 'express';
const router = Router();

import authRoutes from '../auth/routes';
import userRoutes from '../users/routes';

router.use(authRoutes);
router.use(userRoutes);

export default router;