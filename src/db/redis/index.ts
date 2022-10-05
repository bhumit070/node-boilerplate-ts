import { logger } from '../../server/logger';
import Redis from 'ioredis';

const redisOptions = {
	db: 0,
	port: 6379,
	host: 'localhost',
};

export const redisClient = new Redis(redisOptions);
export const redisPublisher = new Redis(redisOptions);
const redisSubscriber = new Redis(redisOptions);

function handleRedisExpiredKeys(channel: string, data: string) {
	logger.info({channel, data});
}

redisSubscriber.on('message', handleRedisExpiredKeys);

export const subScribeExpired = () => {
  const expiredSubKey = `__keyevent@${redisOptions.db}__:expired`;
  redisSubscriber.subscribe(expiredSubKey, 'users');
};

//TODO: need to check how to fix this ?
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
redisClient.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], subScribeExpired);

redisClient.on('connect', () => {
	logger.info('Redis connected');
});

redisClient.on('error', (error) => {
	logger.error('Redis error', error);
});