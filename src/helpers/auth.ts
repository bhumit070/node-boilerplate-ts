
import jwt from 'jsonwebtoken';
import { responseHelpers } from './index';
import { constants } from '../config';
import { IUser } from '../db/mongodb/models/users.model';

export interface IDecodedToken {
	id: string;
}

export function encodeToken(user: IUser): string {

	if(!user.id || !user._id) {
		throw new responseHelpers.CustomError({ status: 500, message: 'Something went wrong' });
	}

	const userId = user._id?.toString() || user.id;
	
	const jwtTokenPayload: IDecodedToken = {
		id: userId,
	};

	const jwtTokenConfig = {
		expiresIn: constants.JWT_EXPIRES_IN
	};

	const token = jwt.sign(jwtTokenPayload, constants.JWT_SECRET, jwtTokenConfig);
	return token;
}

export function decodeToken(token: string): Promise<IDecodedToken> {
	const decoded = new Promise((resolve, reject) => {
		try {
			const payload = jwt.verify(token, constants.JWT_SECRET);
			resolve(payload);
		} catch (err) {
			reject(err);
		}
	});
	return decoded as Promise<IDecodedToken>;
}
