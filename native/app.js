const querystring = require('querystring'),
    handlerUserRouter = require("./src/routers/user"),
    handlerBlogRouter = require("./src/routers/blog");
const SESSION_DATA = {};
const getPostData = (req) => {
    let postData = '';
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
    let sessionID = req.cookie.sessionID,
        // 登录成功后再把sessionID返回回去
        needSetCookie = true;
    if (sessionID) {
        if (!SESSION_DATA[sessionID]) {
            SESSION_DATA[sessionID] = {};
            needSetCookie = false;
        }
    } else {
        sessionID = new Date().getTime() + Math.random() + "";
        SESSION_DATA[sessionID] = {};
        needSetCookie = false;
    }
    req.session = SESSION_DATA[sessionID];

    console.log(req.session)


    getPostData(req).then(postData => {
        req.body = postData;

        let userData = handlerUserRouter(req, res);
        if (userData) {
            userData.then(result => {
                if (needSetCookie) {
                    // 服务端设置cookie并添加httpOnly禁止客户端修改
                    res.setHeader('Set-Cookie', `sessionID=${sessionID};path=/;httpOnly`);
                }
                res.end(JSON.stringify(result))
            });
            return;
        }
        let blogData = handlerBlogRouter(req, res);
        if (blogData) {
            blogData.then(result => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `sessionID=${sessionID};path=/;httpOnly`);
                }
                res.end(JSON.stringify(result))
            });
            return;
        }
        res.end(JSON.stringify({message: 404}))
    });
};

module.exports = app;
