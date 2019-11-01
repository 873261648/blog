let createError = require('http-errors');
let express = require('express');
let path = require('path');
// 解析cookie插件
let cookieParser = require('cookie-parser');
// 记录日志插件
let logger = require('morgan');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

// 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// 解析POST请求json参数
app.use(express.json());
// 解析POST请求application/x-www-form-urlencoded参数
app.use(express.urlencoded({extended: false}));
// 调用解析cookie插件
app.use(cookieParser());

// 配置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
