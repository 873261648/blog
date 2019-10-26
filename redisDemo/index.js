const redis = require('redis');

// 创建连接
const redisClient = redis.createClient('6379', '127.0.0.1');

// 监控异常
redisClient.on('error', err => {
    console.error(err)
})

// 设置val
redisClient.set('password', '345', redis.print);

// 获取val
redisClient.get('password', (err, val) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(val)
})

// 获取所有key
redisClient.keys("*", (err, val) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(val);
})

// 删除 
// redisClient.del('password', redis.print);