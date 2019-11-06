const express = require('express'),
    router = express.Router(),
    {login} = require("../controller/user"),
    {SuccessModel, ErrorModel} = require("../model/resModel");

router.post('/login', (req, res, next) => {
    let username = req.body.userName || "";
    let password = req.body.password || "";

    login(username, password).then(result => {
        if (!result.username) {
            res.json(new ErrorModel('用户名或密码错误！'));
            return;
        }
        req.session.username = result.username;
        req.session.realname = result.realname;

        res.json(new SuccessModel(result));
    });
});
router.get('/logout', (req, res, next) => {
    req.session.username = '';
    req.session.realname = '';
    res.json(new SuccessModel())
});

module.exports = router;