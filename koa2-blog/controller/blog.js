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
    sql += " ORDER BY createtime DESC";
    return await exec(sql);
}

async function detail(id) {
    let sql = `SELECT * FROM blogs WHERE id=${id}`;
    let result = await exec(sql);
    return result[0] || {};
}

async function newBlog(title, content, author) {
    let time = Date.now();
    title = escape(xss(title));
    content = escape(xss(content));
    let sql = `INSERT INTO blogs(title,content,author,createtime) VALUES(${title},${content},'${author}','${time}')`;
    return await exec(sql)
}

async function update(id, title, content) {
    title = escape(xss(title));
    content = escape(xss(content));
    let sql = `UPDATE blogs set title=${title},content=${content} WHERE id=${id}`;
    return await exec(sql);
}

async function del(id) {
    let sql = `DELETE FROM blogs WHERE id=${id}`;
    return await exec(sql);
}

module.exports = {
    getList,
    detail,
    newBlog,
    update,
    del
};