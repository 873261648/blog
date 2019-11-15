const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const body = require('koa-body');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const path = require("path");
const {REDIS_CONF} = require('./conf/db');

const html = require('./units/html');
const users = require('./routes/users');
const blog = require('./routes/blog');
const upload = require('./routes/upload');

// error handler
onerror(app);

// middleWares
app.use(body({
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    formidable: {
        uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小,
    }
}));


app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    engineSource: 'pug'
}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// 配置session
app.keys = ['WJiol#23123_'];
app.use(session({
    // 配置cookie
    cookie: {
        path: "/",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    },
    // 配置redis
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}));


// 返回html页面
// app.use(html());

// routes
app.use(users.routes(), users.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());
app.use(upload.routes(), upload.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;