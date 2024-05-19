export default {
	API_VERSION_V1: '/v1',
	API_VERSION_V2: '/v2',
	JWT_SECRET: process.env.JWT_SECRET || 'secret',
	JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ||  '1d',
	MAIL_HOST: process.env.MAIL_HOST || '',
	MAIL_PORT: process.env.MAIL_PORT || 587,
	MAIL_USERNAME: process.env.MAIL_USERNAME || '',
	MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
	MAIL_FROM: process.env.MAIL_FROM || 'node@node.com',
	MAIL_DISPLAY_NAME: process.env.MAIL_DISPLAY_NAME || 'Node Boilerplate - JS'
};