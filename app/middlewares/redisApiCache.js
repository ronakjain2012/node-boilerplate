const redis = require('redis');
const config = require('../../config/env/index.js');

const PORT_REDIS = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(PORT_REDIS);

exports.setApiCache = function setApiCache(key, value) {
  redisClient.set(key, JSON.stringify(value));
};

exports.getApiCache = function getApiCache(req, res, next) {
  if (config.REDIS_API_CACHE) {
    let key = req.route.path + '::' + req.originalUrl;
    let cacheKey = '';
    if(req.User){
        cacheKey = req.User._id+'::';
    }
    redisClient.get(cacheKey+key, (error, data) => {
      if (error) res.status(400).send(error);
      if (data !== null) res.status(200).send(JSON.parse(data));
      else next();
    });
  } else {
    next();
  }
};
