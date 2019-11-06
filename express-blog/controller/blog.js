const {exce, escape} = require('../db/mysql'),
    xss = require('xss');


function getList(keyword, author) {
    let sql = 'SELECT * FROM blogs WHERE 1=1';
    if (author) {
        author = escape(author);
        sql += ` AND author=${author}`
    }
    if (keyword) {
        keyword = escape(`%${keyword}%`);
        sql += ` AND title LIKE ${keyword}`
    }
    sql += ' ORDER BY createtime DESC';
    return exce(sql)
}


function getDetail(id) {
    let sql = `SELECT * FROM blogs WHERE id='${id}'`;
    return exce(sql)
}

function newBlog(title, content, author) {
    let createtime = Date.now();
    title = escape(xss(title));
    content = escape(xss(content));
    let sql = `INSERT INTO blogs(title,content,author,createtime) VALUES(${title},${content},'${author}','${createtime}')`;
    return exce(sql);
}

function update(title, content, id) {
    title = escape(xss(title));
    content = escape(xss(content));
    let sql = `UPDATE blogs SET title=${title},content=${content} WHERE id='${id}'`;
    return exce(sql)
}

function del(id) {
    let sql = `DELETE FROM blogs WHERE id='${id}'`;
    return exce(sql);
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    update,
    del
};