const express = require('express'),
    router = express.Router(),
    {getList} = require("../controller/blog"),
    {SuccessModel, ErrorModel} = require('../model/resModel');

router.get('/list', (req, res, next) => {
    let keyword = req.query.keyword || '';
    let author = req.query.author || '';

    getList(keyword, author).then(result => {
        res.json(new SuccessModel(result))
    })
});


module.exports = router;