const {login} = require("../controller/user");
const {SuccessModel, ErrorModel} = require('../model/resModel');

const handlerUserRouter = function (req, res) {
    if (req.method === "POST" && req.router === "/api/user/login") {
        return login(req.body).then(res => {
            if (res) {
                return new SuccessModel(res)
            }
            return new ErrorModel('用户名或密码错误！')
        })
    }
};

module.exports = handlerUserRouter;
