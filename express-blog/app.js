let createError = require('http-errors');
let express = require('express');
let fs = require('fs');
let path = require('path');
// 解析cookie插件
let cookieParser = require('cookie-parser');

let expressSession = require('express-session');
let redisStore = require('connect-redis')(expressSession);
let {redisClient} = require('./db/redis');
// 记录日志插件
let logger = require('morgan');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let html = require('./routes/html');
let blogRouter = require('./routes/blog');
let userRouter = require('./routes/user');

let app = express();

// 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

let sessionStore = new redisStore({
    client: redisClient
});

app.use(expressSession({
    // path:"/",                    // 作用域，默认值/
    // httpOnly:true,               // 客户端不可控 默认值true
    secret: "HELLO_<>#@SDWIWORD",   // 秘钥
    maxAge: 1000 * 60 * 24,          // 失效时间，毫秒数
    store: sessionStore
}));

// 生产环境将详细信息写入到文件中；
// 开发环境直接将简略信息打印到控制台；
if (process.env.NODE_ENV === 'production') {
    // 传入一个文件写入流；
    const logWriteStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), {flags: "a"});
    app.use(logger('combined', {
        stream: logWriteStream
    }));
} else {
    app.use(logger('dev'));
}


// 解析POST请求json参数
app.use(express.json());
// 解析POST请求application/x-www-form-urlencoded参数
app.use(express.urlencoded({extended: false}));
// 调用解析cookie插件
app.use(cookieParser());

// 配置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// 返回html页面
app.use(html);


// 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// 处理404页面
app.use(function (req, res, next) {
    next(createError(404));
});

// 错误处理
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
