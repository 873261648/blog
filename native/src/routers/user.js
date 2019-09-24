const { login } = require("../controller/user");

const handlerUserRouter = function (req, res) {
    if (req.method === "POST" && req.router === "/api/user/login") {
        return login(res.body)
    }
};

module.exports = handlerUserRouter;
