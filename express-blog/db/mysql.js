const mysql = require('mysql'),
    {MYSQL_CONF} = require('../conf/db');

const con = mysql.createConnection(MYSQL_CONF);

con.connect();

function exce(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return
            }
            resolve(result);
        })
    })
}

module.exports = {
    exce,
    escape:mysql.escape  // mysql自带的防止sql注入攻击的方法
};