const http = require('http'),
    fs = require('fs'),
    path = require('path');

// 使用流接收POST数据
// const app = http.createServer((req, res) => {
//     if (req.method === "POST") {
//         req.pipe(res);
//     }
// })
// app.listen(8001);

// 使用流复制文件
const fileName1 = path.resolve(__dirname, "data.txt"),
    fileName2 = path.resolve(__dirname, "data-bak.txt"),
    readStream = fs.createReadStream(fileName1),
    writeStream = fs.createWriteStream(fileName2);

// readStream.pipe(writeStream);

// readStream.on('end', () => {
//     console.log("done")
// })

// http通过流访问文件
const app = http.createServer((req, res) => {
    readStream.pipe(res)
})
app.listen(8001); 