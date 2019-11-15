const router = require('koa-router')();
const {getList, detail, newBlog, update, del} = require("../controller/blog");
const loginCheck = require('../middleware/loginCheck');
const {SuccessModel, ErrorModel} = require('../model/model');

router.prefix('/api/blog');

router.get('/list', async (ctx, next) => {
    let keyword = ctx.query.keyword || "";
    let author = ctx.query.author || "";
    let data = await getList(keyword, author);
    ctx.body = new SuccessModel(data);
});
router.get('/detail', async (ctx, next) => {
    if (isNaN(Number(ctx.query.id))) {
        ctx.body = new ErrorModel('文章id非法');
        return;
    }
    ctx.body = new SuccessModel(await detail(ctx.query.id))
});
router.post('/new', async (ctx, next) => {
    let title = ctx.request.body.title || "";
    let content = ctx.request.body.content || "";
    let author = ctx.session.username;
    let result = await newBlog(title, content, author);
    if (result.insertId) {
        ctx.body = new SuccessModel(result.insertId);
        return;
    }
    ctx.body = new ErrorModel();
});
router.post('/update', async (ctx, next) => {
    let id = ctx.request.body.id || '';
    let title = ctx.request.body.title || "";
    let content = ctx.request.body.content || "";
    let result = await update(id, title, content);
    if (result.affectedRows) {
        ctx.body = new SuccessModel();
        return;
    }
    ctx.body = new ErrorModel();
});

router.post('/del', async (ctx, next) => {
    let id = ctx.request.body.id || '';
    let result = await del(id);
    if (result.affectedRows) {
        ctx.body = new SuccessModel();
        return;
    }
    ctx.body = new ErrorModel();
});


module.exports = router;