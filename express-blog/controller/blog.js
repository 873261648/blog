const {exce, escape} = require('../db/mysql');


function getList(keyword, author) {
    let sql = 'SELECT * FROM blogs WHERE 1=1';
    if (author) {
        author = escape(author);
        sql += ` AND author=${author}`
    }
    if (keyword) {
        // keyword = escape(keyword);
        sql += ` AND title LIKE '%${keyword}%'`
    }
    sql += ' ORDER BY createtime DESC';

    console.log(sql)

    return exce(sql)
}

module.exports = {
    getList
};