import nodemailer from 'nodemailer';
import { constants } from '../config';

// TODO: fix this type definitions
const transporter = nodemailer.createTransport({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
  pool: true,
  host: constants.MAIL_HOST,
  port: constants.MAIL_PORT,
  secure: true,
  auth: {
    user: constants.MAIL_USERNAME,
    pass: constants.MAIL_PASSWORD,
  },
});

export async function sendMail(to: string) {
	await transporter.sendMail({
		from: `${constants.MAIL_DISPLAY_NAME} <${constants.MAIL_FROM}>`,
		to,
		html: 'Hello, from <b>Nodejs JavaScript</b> boilerplate',
		text: 'Hello, from Nodejs JavaScript boilerplate',
		subject: 'NodeJs Boilerplate Mail',
	});
}
