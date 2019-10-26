const {login} = require("../controller/user");
const {SuccessModel, ErrorModel} = require('../model/resModel'),
    {redisSet} = require("../db/redis");

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
};

module.exports = handlerUserRouter;
