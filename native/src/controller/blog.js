let {SuccessModel, ErrorModel} = require("../model/resModel");
let exec = require('../db/mysql');

const getList = (author, keyword) => {
    let sql = 'SELECT * FROM blogs WHERE 1=1 ';
    if (author && author !== '') {
        sql += `author=${author} `
    }
    if (keyword && keyword !== '') {
        sql += `author=${keyword} `
    }
    sql += "ORDER BY createtime DESC";

    return exec(sql);
};
const getDetail = (id) => {
    if (!id) {
        return new ErrorModel('id required')
    }
    return new SuccessModel({
        id,
        title: "标题一",
        content: "aaaaaa",
        author: "zhangsan",
        createTime: 1569160326363
    })
};

const blogNew = (data = {}) => {
    if (!data.title || !data.content || !data.author) {
        return new ErrorModel('信息提供不完整');
    }
    let createTime = new Date().getTime();
    let sql = `INSERT INTO blogs(title,content,author,createtime) values('${data.title}','${data.content}','${data.author}','${createTime}')`;
    return exec(sql);
};
const blogUpdate = (data = {}) => {
    let sql = `UPDATE blogs SET `, updateFieId = [];

    if (data.title && data.title !== '') {
        updateFieId.push(`title='${data.title}'`)
    }
    if (data.content && data.content !== '') {
        updateFieId.push(`content='${data.content}'`)
    }
    sql += updateFieId.join()+' ';
    sql += `WHERE id='${data.id}'`;
    return exec(sql)
};
const blogDel = (data = {}) => {
    let sql = `DELETE FROM blogs WHERE id=${data.id}`;
    return exec(sql);
};

module.exports = {
    getList,
    getDetail,
    blogNew,
    blogUpdate,
    blogDel
};
