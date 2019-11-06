const xss = require('xss'),
    {exce, escape} = require('../db/mysql'),
    {genPassword} = require('../units/encryp');


function login(username, password) {
    username = escape(xss(username));
    password = escape(xss(genPassword(password)));
    let sql = `SELECT username,realname FROM users WHERE username=${username} AND password=${password}`;
    return exce(sql).then(result => {
        return result[0] || {}
    })
}

module.exports = {
    login
};