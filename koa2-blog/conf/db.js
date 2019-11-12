let MYSQL_CONF = {}, REDIS_CONF = {}, evn = process.env.NODE_ENV;

if (evn === 'production') {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "873261648@ying",
        database: 'blog'
    };
    REDIS_CONF = {
        host: "127.0.0.1",
        port: 6379
    }
} else {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "873261648@ying",
        database: 'blog'
    };
    REDIS_CONF = {
        host: "127.0.0.1",
        port: 6379
    }
}


module.exports = {
    MYSQL_CONF,
    REDIS_CONF
};