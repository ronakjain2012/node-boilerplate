const winston = require('winston');
const { combine, timestamp, printf, colorize, simple } = winston.format;

winston.addColors({
  info: 'cyan',
});

const myFormat = printf(({ message, timestamp }) => {
  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }
  return `${timestamp} : ${message}`;
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: combine(colorize(), simple()),
      json: false,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'storage/logs/errors.log',
      level: 'error',
      format: combine(timestamp(), myFormat),
    }),
    new winston.transports.File({
      filename: 'storage/logs/debug.log',
      level: 'debug',
      format: combine(timestamp(), myFormat),
    }),
    new winston.transports.File({
      filename: 'storage/logs/warn.log',
      level: 'warn',
      format: combine(timestamp(), myFormat),
    }),
  ],
});

module.exports = logger;
