const http = require('http'),
    app = require("../app");


const server = http.createServer(app);
server.listen(8000, () => {
    console.log("server runing at http://localhost:8000");
});
