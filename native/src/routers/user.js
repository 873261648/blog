const {login} = require("../controller/user");
const {SuccessModel, ErrorModel} = require('../model/resModel');

const handlerUserRouter = function (req, res) {
    if (req.method === "GET" && req.router === "/api/user/login") {
        return login(req.query).then(result => {
            if (result) {
                req.session.username = result.username;
                req.session.realname = result.realname;
                return new SuccessModel(result)
            }
            return new ErrorModel('用户名或密码错误！')
        })
    }
};

module.exports = handlerUserRouter;
