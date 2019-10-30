const fs = require('fs'),
    path = require('path'),
    readLine = require('readline');

const fullFileName = path.resolve(__dirname, '../', 'logs', 'access.log');
let logs = readLine.createInterface({
    input: fs.createReadStream(fullFileName)
});
let sum = 0, num = 0;

logs.on('line', result => {
    sum++;
    let logItems = result.split(" -- ");
    if (logItems[2].indexOf('Chrome') > -1) {
        num++
    }
});
logs.on('close', () => {
    console.log(`Chrome浏览器的访问占比是${((num / sum) * 100).toFixed(2)}%`)
});