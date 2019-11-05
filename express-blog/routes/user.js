const express = require('express'),
    router = express.Router(),
    {login} = require("../controller/user"),
    {SuccessModel, ErrorModel} = require("../model/resModel");

router.post('/login', (req, res, next) => {
    let username = req.body.userName || "";
    let password = req.body.password || "";
    login(username, password).then(result => {
        console.log(result)
    });
});

module.exports = router;