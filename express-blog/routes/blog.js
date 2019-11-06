const express = require('express'),
    router = express.Router(),
    {getList, getDetail, newBlog, update, del} = require("../controller/blog"),
    loginCheck = require('../middleWare/loginCheck'),
    {SuccessModel, ErrorModel} = require('../model/resModel');

router.get('/list', (req, res, next) => {
    let keyword = req.query.keyword || '';
    let author = req.query.author || '';

    getList(keyword, author).then(result => {
        res.json(new SuccessModel(result))
    })
});

router.get('/detail', (req, res, next) => {
    let id = req.query.id || 0;
    getDetail(id).then(result => {
        let detail = result[0] || {};
        res.json(new SuccessModel(detail))
    })
});

router.post('/new', loginCheck, (req, res, next) => {
    let title = req.body.title || "";
    let content = req.body.content || "";
    let author = req.session.username;

    newBlog(title, content, author).then((result) => {
        if (!result.insertId) {
            res.json(new ErrorModel('添加失败'));
            return;
        }
        res.json(new SuccessModel({
            insertId: result.insertId
        }))
    });
});

router.post('/update', loginCheck, (req, res, next) => {
    let title = req.body.title || "";
    let content = req.body.content || "";
    let id = req.body.id || 0;
    update(title, content, id).then(result => {
        if (result.affectedRows) {
            res.json(new SuccessModel());
            return;
        }
        res.json(new ErrorModel())
    });
});

router.post('/del', loginCheck, (req, res, next) => {
    let id = req.body.id || 0;
    del(id).then(result => {
        if (result.affectedRows) {
            res.json(new SuccessModel());
            return;
        }
        res.json(new ErrorModel())
    });
});


module.exports = router;