const fs = require('fs'),
    path = require('path');

// __dirname相当于一个全局变量，当前文件夹路径
// 由于各系统路径表示方法不一致，所以用path拼接
const fileName = path.resolve(__dirname, 'data.txt');
console.log(fileName)
fs.readFile(fileName, (err, content) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(content.toString())
})
// w（默认值）：打开文件用于写入
// a:追加文件
// http://nodejs.cn/api/fs.html#fs_file_system_flags
const opt = {
    flag: "a"
}
const content = "追加内容\n";
fs.writeFile(fileName, content, opt, err => {
    if (err) {
        console.log(err)
    }
})

// 文件IO对资源使用量较大，所以建议使用流的方式操作文件