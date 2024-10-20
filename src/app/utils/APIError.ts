import logger from "@/logger";

class ExtendableError extends Error {
  constructor(message, status, isPublic, error, extraMeta) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    logger.error(`@Error: ${message}`, status, error.stack, extraMeta);
  }
}

export class APIError extends ExtendableError {
  constructor(statusCode, message, error = {}, isPublic = true, extraMeta = null) {
    super(message, statusCode, isPublic, error, extraMeta);
    Error.captureStackTrace(error);
    this.statusCode = statusCode;
    this.isPublic = isPublic;
  }
}

export default APIError;
