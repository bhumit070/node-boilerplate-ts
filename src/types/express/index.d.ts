import { IUser } from '../../db/mongodb/models/users.model';

export {};

declare global {
	namespace Express {
		export interface Request {
			user?: IUser
		}
	}
}