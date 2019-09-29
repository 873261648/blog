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
    // 获取和解析cookie
    console.log(req.headers.cookie);

    // 获取get请求参数
    req.query = querystring.parse(req.url.split('?')[1]);
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
