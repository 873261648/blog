const {login} = require("../controller/user");
const {SuccessModel, ErrorModel} = require('../model/resModel');

const handlerUserRouter = function (req, res) {
    if (req.method === "GET" && req.router === "/api/user/login") {
        return login(req.query).then(result => {
            if (result) {
                // 服务端设置cookie并添加httpOnly禁止客户端修改
                res.setHeader('Set-Cookie', `userName=${result.username};path=/;httpOnly`);
                return new SuccessModel(result)
            }
            return new ErrorModel('用户名或密码错误！')
        })
    }
};

module.exports = handlerUserRouter;
