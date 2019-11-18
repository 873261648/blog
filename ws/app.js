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
});

// 有新用户接入
wsServer.on('connection', function connection(ws) {
    ws.data = {
        'userName': 1,
        'headerImg': 2
    };


    ws.on('message', function (message) {
        wsServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('有人发了一条新消息');
                client.send(JSON.stringify(ws.data));
            }
        });
        console.log('received: %s', message);
    });
    ws.send(JSON.stringify(ws.data));
});

app.listen(3000, () => {
    console.log('server at http://localhost:3000')
})