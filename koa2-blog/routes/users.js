const router = require('koa-router')();
const {login} = require('../controller/users');
const {SuccessModel, ErrorModel} = require("../model/model");

router.prefix('/api/user');

router.post('/login', async (ctx, next) => {
    let username = ctx.request.body.userName || '';
    let password = ctx.request.body.password || '';
    let result = await login(username, password);
    if (result.username) {
        ctx.body = new SuccessModel(result);
        ctx.session.username = result.username;
        ctx.session.realname = result.realname;
        return;
    }
    ctx.body = new ErrorModel('用户名或密码错误');
});
router.post("/logout", async (ctx, next) => {
    ctx.session = {};
    ctx.body = new SuccessModel();
});


module.exports = router;
