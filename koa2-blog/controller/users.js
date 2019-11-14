const {exec, escape} = require('../db/mysql');
const xss = require('xss');
const {genPassword} = require('../units/encryp');


async function login(username, password) {
    username = escape(xss(username));
    password = escape(xss(genPassword(password)));
    let sql = `SELECT username,realname FROM users WHERE username=${username} AND password=${password}`;
    let result = await exec(sql);
    return result[0] || {};
}

module.exports = {
    login
};