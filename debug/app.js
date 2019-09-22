let http = require('http');


let a = 1,b=2,c=3;

c=a+b;
a = c+a;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'content-type': "text/html"});
    res.end("<p>hello</p>")
});
server.listen(3000, () => {
    console.log('server runding at http://localhost:3000')
});
