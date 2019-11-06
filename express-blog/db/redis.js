const redis = require('redis'), {REDIS_CONF} = require('../conf/db');

const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host);

module.exports = {
    redisClient
};