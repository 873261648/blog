const {login} = require("../controller/user");
const {SuccessModel, ErrorModel} = require('../model/resModel'),
    {redisSet, redisDel} = require("../db/redis");

const handlerUserRouter = function (req, res) {
    if (req.method === "POST" && req.router === "/api/user/login") {
        return login(req.body).then(result => {
            if (result) {
                req.session.userName = result.username;
                req.session.realname = result.realname;
                redisSet(req.cookie.userID, result);
                return new SuccessModel(result)
            }
            return new ErrorModel('用户名或密码错误！')
        })
    }
    if (req.method === "GET" && req.router === "/api/user/logout") {
        return Promise.resolve().then(() => {
            redisDel(req.cookie.userID);
            req.session = {};
            // res.setHeader('Set-Cookie', `userID=${req.cookie.userID};expires=${new Date(0).toGMTString()}`);
            return new SuccessModel("成功！")
        })
    }
};

module.exports = handlerUserRouter;
