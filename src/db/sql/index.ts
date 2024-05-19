import { PrismaClient } from '@prisma/client';
import { errorLogger, logger } from '../../server/logger';

export const prisma = new PrismaClient();


prisma.$connect().then(() => {
	logger.info('Connected to database via prisma 🔼.');
})
.catch((err: unknown) => {
	errorLogger.error(err);
});


prisma.$on('beforeExit', async () => {
	await prisma.$disconnect();
});
