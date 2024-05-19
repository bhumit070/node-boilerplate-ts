import { Router, Application } from 'express';
import { constants } from '../../config';
import v1Routes from '../v1';
import v2Routes from '../v2';

const router = Router();

router.use(constants.API_VERSION_V1, v1Routes);
router.use(constants.API_VERSION_V2, v2Routes);

export default (app: Application) => app.use('/api', router);