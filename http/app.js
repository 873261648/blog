const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    console.log(`${req.method}:${req.url}`);  //GET:/?name=aaa&pwd=bbb
    if (req.method === "GET") {
        get(req, res);
    } else {

        post(req, res);
    }
});
server.listen(8080, () => {
    console.log("server runing at http://localhost:8080");
});


// nodeJS原生方法处理GET请求
function get(req, res) {
    req.query = querystring.parse(req.url.split('?')[1]);
    console.log(req.query);
    res.end(JSON.stringify(req.query));
}

function post(req, res) {
    let postData = '';

    req.on('data', chunk => {
        postData += chunk.toString()
    });

    req.on('end', () => {
        req.body = JSON.parse(postData);
        console.log(req.body.name);
        res.end(JSON.stringify(req.body));
    })
}