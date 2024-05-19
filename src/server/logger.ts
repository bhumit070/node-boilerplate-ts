import { transports, createLogger, format } from 'winston';

export const errorLogger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: './logs/error.log', level: 'error' }),
  ],
});

export const successLogger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: './logs/success.log', level: 'info' }),
  ],
});

export const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: './logs/logger.log', level: 'info' }),
  ],
});
