/**
 * @extends Error
 */
class ExtendableError extends Error {
	constructor(message, status, isPublic) {
		super(message);
		this.name = this.constructor.name;
		this.message = message;
		this.status = status;
		this.isPublic = isPublic;
		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor.name);
	}
}

class APIError extends ExtendableError {
	/**
   * Creates an API error.
   *
   * @param {String} message - Error message.
   * @param {Number} status - HTTP status code of error.
   * @param {Boolean} isPublic - Whether the message should be visible to user or not.
   */
	constructor(message, status = apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, isPublic = true, err = {}) {
		if(message===null) {
			message = `${err.message} || ${err.statusCode}`;
		}
		super(message, status, isPublic);
	}
}

/**
 * Class for required error
 *
 * @class RequiredError
 */
exports = class RequiredError {
	/**
   * Make error pretty
   *
   * @static
   * @param {Array} errors - Array of error Object
   * @returns {Object} - errors - Pretty Object transform
   */
	static makePretty(errors) {
		return errors.reduce((obj, error) => {
			const nObj = obj;
			nObj[error.field] = error.messages[0].replace(/"/g, '');
			return nObj;
		}, {});
	}
};

module.exports = APIError;
