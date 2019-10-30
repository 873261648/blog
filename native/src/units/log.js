const fs = require("fs"),
    path = require("path");
const ENV = process.env.NODE_ENV;

function createWriteStream(fileName) {
    const fullFileName = path.resolve(__dirname, '../', 'logs', fileName);
    const opt = {flags: "a"};
    return fs.createWriteStream(fullFileName, opt);
}

function writeLog(log, writeStream) {
    // 生产环境写入日志，开发环境直接打印
    // if (ENV === 'dev') {
    //     console.log(log);
    //     return;
    // }
    writeStream.write(log + '\n');
}

const accessWriteStream = createWriteStream('access.log');
const eventWriteStream = createWriteStream('event.log');
const errorWriteStream = createWriteStream('error.log');


function access(log) {
    writeLog(log, accessWriteStream)
}

function event(log) {
    writeLog(log, eventWriteStream)
}

function error(log) {
    writeLog(log, errorWriteStream)
}


module.exports = {
    access,
    event,
    error
};