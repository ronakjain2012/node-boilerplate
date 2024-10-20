import winston, { info } from 'winston';
import config from '../../config/index';
import { getNow, toString } from '@/helper';

const transports = [];
const filePostFix = `-${getNow(config.detetime.longDate)}`;

const customFormatter = (info) => {
  // Handle objects and arrays in meta recursively
  function formatValue(value) {
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.map(formatValue);
      } else {
        return toString(value); // Indent JSON for better readability
      }
    }
    return value;
  }

  const newMsg = formatValue(info.message);
  const formattedMessage = `${info.timestamp} [${info.level}]: ${newMsg}`;
  return formattedMessage;
};

const sameLogFormat = () =>
  winston.format.combine(
    winston.format.timestamp({
      format: config.detetime.longDataTime,
    }),
    winston.format.json(),
    winston.format.printf(customFormatter),
  );

if (process.env.NODE_ENV !== 'development') {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.Console({
      format: sameLogFormat(),
    }),
    new winston.transports.File({
      level: 'info',
      filename: `storage/logs/info${filePostFix}.log`,
      maxsize: 1048576,
      maxFiles: 10,
      handleExceptions: true,
      format: sameLogFormat(),
    }),
    new winston.transports.File({
      level: 'debug',
      filename: `storage/logs/debug${filePostFix}.log`,
      maxsize: 1048576,
      maxFiles: 10,
      handleExceptions: true,
      format: sameLogFormat(),
    }),
    new winston.transports.File({
      level: 'error',
      filename: `storage/logs/error${filePostFix}.log`,
      maxsize: 1048576,
      maxFiles: 10,
      handleExceptions: true,
      format: sameLogFormat(),
    }),
  );
}

export const loggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: config.detetime.longDataTime,
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports,
});

class logger {
  constructor(private logger) {
    this.logger = logger;
  }

  info(...args) {
    return this.logger.info(args);
  }

  warn(...args) {
    return this.logger.warn(args);
  }

  debug(...args) {
    return this.logger.debug(args);
  }

  error(...args) {
    return this.logger.error(args);
  }
}

export default new logger(loggerInstance);