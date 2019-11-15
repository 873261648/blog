const http = require("http");
const WebSocket = require("ws");

function callback(req, res) {
    res.setHeader('ContentType', "text");
    res.send("hello")
}
// http和websocket统一端口
const app = http.createServer(callback)

const wsServer = new WebSocket.Server({
    server: app
})

wsServer.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        wss.client

        console.log('received: %s', message);
    });
    ws.send('连接成功');
});

app.listen(3000,()=>{
    console.log('server at http://localhost:3000')
})