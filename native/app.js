const querystring = require('querystring'),
    handlerUserRouter = require("./src/routers/user"),
    handlerBlogRouter = require("./src/routers/blog");

const app = (req, res) => {
    res.setHeader('Content-type', "application/json");
    req.router = req.url.split("?")[0];
    console.log(req.method +" "+req.router);

    if (req.method === "GET") {
        req.query = querystring.parse(req.url.split('?')[1]);
    } else {
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString()
        });
        req.on('end', () => {
            req.query = JSON.parse(postData);
        })
    }


    let userData = handlerUserRouter(req, res);
    if (userData) {
        res.end(JSON.stringify(userData))
    }
    let blogData = handlerBlogRouter(req, res);
    if (blogData) {
        res.end(JSON.stringify(blogData))
    }
    res.end(JSON.stringify({message: 404}))
};

module.exports = app;


