const mysql = require('mysql');
const {MYSQL_CONF} = require('../conf/db');

const con = mysql.createConnection(MYSQL_CONF);

con.connect();

function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    });
}

module.exports = {
    exec,
    escape: mysql.escape   // mysql 自带的防止sql注入的方法
};
