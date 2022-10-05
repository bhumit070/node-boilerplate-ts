import { Router, Request, Response, Application } from 'express';
const router = Router();
import { constants } from '../../config';
import { responseHelpers } from '../../helpers';
import V1Routes from './v1.route';

router.use(constants.API_VERSION_V1, V1Routes);

router.use((req: Request, res: Response) => {
	return new responseHelpers.CustomResponse(res).send({
		error: true,
		message: 'Route not found',
		status: 404,
	});
});

export default (app: Application) => app.use('/api', router);