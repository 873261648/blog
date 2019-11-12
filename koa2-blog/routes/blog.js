const router = require('koa-router')();
const {getList} = require("../controller/blog");
const {SuccessModel, ErrorModel} = require('../model/model');

router.prefix('/api/blog');

router.get('/list', async (ctx, next) => {
    let keyword = ctx.query.keyword || "";
    let author = ctx.query.author || "";
    let data = await getList(keyword, author);
    ctx.body = new SuccessModel(data);
});

module.exports = router;