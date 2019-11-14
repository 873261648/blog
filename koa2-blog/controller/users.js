const {exec, escape} = require('../db/mysql');
const xss = require('xss');


async function login(username, password) {
    username = escape(xss(username));
    password = escape(xss(password));
    let sql = `SELECT username,realname FROM users WHERE username=${username} AND password=${password}`;
    let result = await exec(sql);
    return result[0] || {};
}

module.exports = {
    login
};