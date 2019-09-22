const handlerUserRouter = function (req, res) {
    if (req.method === "POST" && req.router === "/api/user/login") {
        return {
            message: "登录接口"
        }
    }
};

module.exports = handlerUserRouter;