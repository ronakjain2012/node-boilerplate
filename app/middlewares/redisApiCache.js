const redis = require('redis');
const config = require('../../config/env/index.js');
const logger = require('../../utils/logger.js');

console.log(config.REDIS.ENABLE,"config.REDIS.ENABLE")
const PORT_REDIS = config.REDIS.PORT || 50986;
const redisClient = config.REDIS.ENABLE ? redis.createClient(PORT_REDIS) : null;

exports.setApiCache = function setApiCache(key, value) {
  if(config.REDIS.ENABLE){
    redisClient.set(key, JSON.stringify(value));
  }
};

exports.getApiCache = function getApiCache(req, res, next) {
  if (config.REDIS.ENABLE && config.REDIS_API_CACHE) {
    let key = req.route.path + '::' + req.originalUrl;
    let cacheKey = '';
    if (req.User) {
      cacheKey = req.User._id + '::';
    }
    redisClient.get(cacheKey + key, (error, data) => {
      if (error) res.status(400).send(error);
      if (data !== null) {
        logger.info(cacheKey + key + ' || Serverd from cache.');
        res.status(200).send(JSON.parse(data));
      } else next();
    });
  } else {
    next();
  }
};