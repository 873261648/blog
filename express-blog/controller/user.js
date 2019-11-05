const {exce, escape} = require('../db/mysql'), xss = require('xss');


function login(username, password) {
    username = escape(xss(username));
    password = escape(xss(password));

    let sql = `SELECT username,realname FROM users WHERE username=${username} AND password=${password}`;
    return exce(sql).then(result => {
        console.log(result)
    })
}

module.exports = {
    login
};