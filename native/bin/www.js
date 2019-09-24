const http = require('http'),
    app = require("../app"),os = require('os');


const server = http.createServer(app);
server.listen(8080, () => {
    console.log("server runing at http://localhost:8080");
});
