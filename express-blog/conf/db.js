const dev = process.env.NODE_ENV;


let MYSQL_CONF, REDIS_CONF;
if (dev === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: "root",
        password: "873261648@ying",
        database: "blog"
    };
    REDIS_CONF = {
        port: 6379,
        host: "127.0.0.1"
    }
} else {
    MYSQL_CONF = {
        host: 'localhost',
        user: "root",
        password: "873261648@ying",
        database: "blog"
    };
    REDIS_CONF = {
        port: 6379,
        host: "127.0.0.1"
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
};