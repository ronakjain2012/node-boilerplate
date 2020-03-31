/**
 * Create the winston logger instance
 */

import winston from 'winston';

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
  ],
});

export default logger;
