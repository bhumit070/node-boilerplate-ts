import { UserModel } from '../../../db/mongodb/models';
import { redisClient , redisPublisher } from '../../../db/redis';
import { responseHelpers } from '../../../helpers/index';
import { prisma } from '../../../db/sql';
import type { Request, Response } from 'express';
const { CustomResponse } = responseHelpers;

export async function getAllUsers(req: Request, res: Response) {
	try {
		const cachedUsers = await redisClient.get('users');
		if(cachedUsers) {
			return new CustomResponse(res).send({ data: { users: JSON.parse(cachedUsers) }});
		}
		const users = await UserModel.find({});
		redisPublisher.publish('users', JSON.stringify(users));
		await redisClient.setex('users', 10, JSON.stringify(users));
		return new CustomResponse(res).send({ data: { users }});
	} catch (error) {
		return new CustomResponse(res).send({ error });
	}
}

export async function getSQLAllUsers(req: Request, res: Response) {
	try {
		const users = await prisma.user.findMany();
		return new CustomResponse(res).send({ data: { users }});
	} catch (error) {
		return new CustomResponse(res).send({ error });
	}
}