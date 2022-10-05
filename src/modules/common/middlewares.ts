

import { Response, NextFunction, Request } from 'express'; 
import { UserModel } from '../../db/mongodb/models';
import { IUser } from '../../db/mongodb/models/users.model';
import { authHelpers, responseHelpers } from '../../helpers';
const { CustomResponse, CustomError } = responseHelpers;

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	try {

		let token = req.headers.authorization;

		if(!token) {
			throw new CustomError({ status: 401, message: 'You are not authorized.' });
		}

		if(token.includes('Bearer')) {
			token = token.substring(7).trim();
		}

		const decoded = await authHelpers.decodeToken(token);

		if(!decoded) {
			throw new CustomError({ status: 401, message: 'You are not authorized.' });
		}

		const user = await UserModel.findOne({ _id: decoded.id }).lean();

		if(!user) {
			throw new CustomError({ status: 401, message: 'You are not authorized.' });
		}

		req.user = user as IUser;

		return next();
	} catch (error) {
		return new CustomResponse(res).send({ error, status: 401, message: 'Session has been expired, please login again.' });
	}
}