import { Router } from 'express';
const router = Router();
import * as authControllers from './controllers';

router.route('/login').post(authControllers.login);
router.route('/register').post(authControllers.register);

router.route('/login/sql').post(authControllers.loginSQL);
router.route('/register/sql').post(authControllers.registerSQL);

export default router;