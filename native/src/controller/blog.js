let {SuccessModel, ErrorModel} = require("../model/resModel");
let {exec, escape} = require('../db/mysql');

const getList = (author, keyword) => {
    let sql = 'SELECT * FROM blogs WHERE 1=1 ';
    if (author && author !== '') {
        sql += `AND author=${escape(author)} `
    }
    if (keyword && keyword !== '') {
        sql += `AND title LIKE %${escape(keyword)}% `
    }
    sql += "ORDER BY createtime DESC";
    console.log(sql);
    return exec(sql);
};
const getDetail = (id) => {
    if (!id) {
        return new ErrorModel('id required')
    }
    let sql = `SELECT * FROM blogs WHERE id='${id}'`;
    return exec(sql).then(res => {
        return res[0] || {}
    })
};

const blogNew = (data = {}) => {
    if (!data.title || !data.content) {
        return new ErrorModel('信息提供不完整');
    }
    let createTime = new Date().getTime();
    data.title = escape(data.title);
    data.content = escape(data.content);

    let sql = `INSERT INTO blogs(title,content,author,createtime) VALUES(${escape(data.title)},${data.content},'${data.author}','${createTime}')`;
    return exec(sql).then(res => {
        return res.insertId
    });
};
const blogUpdate = (data = {}) => {
    let sql = `UPDATE blogs SET `, updateFieId = [];

    if (data.title && data.title !== '') {
        data.title = escape(data.title);
        updateFieId.push(`title=${data.title}`)
    }
    if (data.content && data.content !== '') {
        data.content = escape(data.content);
        updateFieId.push(`content=${data.content}`)
    }
    sql += updateFieId.join() + ' ';
    sql += `WHERE id='${data.id}'`;
    return exec(sql).then(res => {
        return res.affectedRows > 0
    })
};
const blogDel = (data = {}, author) => {
    let sql = `DELETE FROM blogs WHERE id=${data.id} and author='${author}'`;
    return exec(sql).then(res => {
        return res.affectedRows > 0
    });
};

module.exports = {
    getList,
    getDetail,
    blogNew,
    blogUpdate,
    blogDel
};
