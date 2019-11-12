const {exec, escape} = require('../db/mysql');
const xss = require('xss');

async function getList(keyword, author) {
    let sql = "SELECT * FROM blogs WHERE 1=1";

    if (keyword) {
        keyword = escape(xss(`%${keyword}%`));
        sql += ` AND title like ${keyword}`;
    }
    if (author) {
        sql += ` AND author='${author}'`;
    }
    sql+=" ORDER BY createtime DESC";

    // console.log(sql);
    return await exec(sql);
}

module.exports = {
    getList
};