const querystring = require('querystring'),
    handlerUserRouter = require("./src/routers/user"),
    handlerBlogRouter = require("./src/routers/blog");

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
    console.log(req.method + " " + req.router);

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

    getPostData(req).then(postData => {
        req.body = postData;

        let userData = handlerUserRouter(req, res);
        if (userData) {
            userData.then(result => {
                res.end(JSON.stringify(result))
            });
            return;
        }
        let blogData = handlerBlogRouter(req, res);
        if (blogData) {
            blogData.then(result => {
                res.end(JSON.stringify(result))
            });
            return;
        }
        res.end(JSON.stringify({message: 404}))
    });
};

module.exports = app;
