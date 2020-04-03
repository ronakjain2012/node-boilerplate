/**
 * Create the winston logger instance
 */

import winston from 'winston';

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'storage/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'storage/logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'storage/logs/waring.log', level: 'warn' }),
    new winston.transports.File({ filename: 'storage/logs/log.log', level: 'log' }),
    new winston.transports.Console({level: 'cl'})
  ],
});

export default logger;
