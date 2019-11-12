const mysql = require('mysql');
const {MYSQL_CONF} = require('../conf/db');

let mysqlClient = mysql.createConnection(MYSQL_CONF);

mysqlClient.connect({}, (err, res) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('mysql 连接成功')
});

function exec(sql) {
    return new Promise((resolve, reject) => {
        mysqlClient.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec,
    escape: mysql.escape
};