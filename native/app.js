const querystring = require('querystring'),
    handlerUserRouter = require("./src/routers/user"),
    handlerBlogRouter = require("./src/routers/blog"),
    {redisGet, redisSet} = require("./src/db/redis"),
    {access} = require('./src/units/log');


const getPostData = (req) => {
    let postData = "";
    return new Promise((resolve) => {
        if (req.method !== "POST") {
            resolve({});
            return;
        }
        req.on('data', chunk => {
            postData += chunk.toString()
        });
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(JSON.parse(postData));
        });
    });
};
// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}

const app = (req, res) => {
    // 设置返回格式为application/json
    res.setHeader('Content-type', "application/json");
    // 获取url
    req.router = req.url.split("?")[0];


    // 获取get请求参数
    req.query = querystring.parse(req.url.split('?')[1]);


    // 获取和解析cookie
    req.cookie = {};
    let cookieStr = req.headers.cookie || '';
    cookieStr.split(';').map(item => {
        if (item.indexOf('=') !== -1) {
            let key = item.split('=')[0].trim();
            req.cookie[key] = item.split('=')[1].trim();
        }
    });

    // 解析session
    let userID = req.cookie.userID,
        // 登录成功后再把userID返回回去
        needSetCookie = false;
    // if (userID) {
    //     if (!SESSION_DATA[userID]) {
    //         SESSION_DATA[userID] = {};
    //     }
    // } else {
    //     userID = new Date().getTime() + Math.random() + "";
    //     SESSION_DATA[userID] = {};
    //     needSetCookie = true;
    // }

    // 记录访问日志
    access(`${req.method} -- ${req.router} -- ${req.headers["user-agent"]} -- ${Date.now()}`);

    if (!userID) {
        userID = new Date().getTime() + Math.random() + "";
        redisSet(userID, {});
        needSetCookie = true;
    }
    redisGet(userID).then(res => {
        if (res === null) {
            redisSet(userID, {});
            req.session = {};
        } else {
            req.session = res;
        }

        return getPostData(req)
    })
        .then(postData => {
            req.body = postData;

            let userData = handlerUserRouter(req, res);
            if (userData) {
                userData.then(result => {
                    if (needSetCookie) {
                        // 服务端设置cookie并添加httpOnly禁止客户端修改
                        res.setHeader('Set-Cookie', `userID=${userID};path=/;httpOnly`);
                    }
                    res.end(JSON.stringify(result))
                });
                return;
            }
            let blogData = handlerBlogRouter(req, res);
            if (blogData) {
                blogData.then(result => {
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userID=${userID}; path=/; httpOnly; expires=${getCookieExpires()}`);
                    }
                    res.end(JSON.stringify(result))
                });
                return;
            }
            res.end(JSON.stringify({message: 404}))
        });
};

module.exports = app;
