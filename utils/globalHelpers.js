const logger = require('./../config/others/winston.js');
const apiResponse = require('./apiResponse.js');
global.logger = logger;
global.apiResponse = apiResponse;
module.exports = apiResponse;