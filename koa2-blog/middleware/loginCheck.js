const {ErrorModel} = require("../model/model");

async function loginCheck(ctx, next) {
    if (ctx.session.username) {
        next();
        return;
    }
    ctx.body = new ErrorModel('会话失效或未登录')
}

module.exports = loginCheck;