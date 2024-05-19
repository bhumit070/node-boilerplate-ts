import { Router } from 'express'; 
import { commonMiddlewares } from '../../common';
import * as userController from './controllers';

const router = Router();

router.use(commonMiddlewares.isAuthenticated);

router.route('/users').get(userController.getAllUsers);
router.route('/users/sql').get(userController.getSQLAllUsers);

export default router;