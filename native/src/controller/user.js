const xss = require('xss'),
    {exec, escape} = require('../db/mysql'), {genPassword} = require('../units/encryp');

const login = ({userName, password}) => {
    // 密码加密
    password = genPassword(password);

    // xss将<>转义使其无法形成script片段
    userName = xss(userName);
    password = xss(password);

    // 通过转义防止sql注入攻击
    userName = escape(userName);
    password = escape(password);

    let sql = `SELECT username,realname FROM users WHERE username=${userName} and password=${password}`;
    console.log(sql);
    return exec(sql).then(result => {
        return result[0]
    })
};

module.exports = {
    login
};
