import redis from 'redis';
import config from '../../config/env/index.js';

const PORT_REDIS = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(PORT_REDIS);

export function setApiCache(key, value) {
  redisClient.set(key, JSON.stringify(value));
}

export function getApiCache(req, res, next) {
  if (config.REDIS_API_CACHE) {
    let key = req.route.path + '::' + req.originalUrl;
    redisClient.get(key, (error, data) => {
      if (error) res.status(400).send(error);
      if (data !== null) res.status(200).send(JSON.parse(data));
      else next();
    });
  } else {
    next();
  }
}

export default getApiCache;
