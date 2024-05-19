import { Router, Application } from 'express';
import { constants } from '../../config';
import v1Routes from '../v1';
const router = Router();

router.use(constants.API_VERSION_V1, v1Routes);

export default (app: Application) => app.use('/api', router);