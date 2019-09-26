const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "873261648@ying",
    database: "blog"
});

connection.connect();
// 查询
// let sql = 'SELECT * FROM users';

// 新增 insertId是新增后返回的ID
// let sql = `INSERT INTO users(username,password,realname) values('sucheon','sucheon','硕橙')`;

// 更新 affectedRows:受影响的行数
let sql = `UPDATE users SET realname='张三' WHERE id='1'`;
connection.query(sql, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result)
    }
});
connection.end();
