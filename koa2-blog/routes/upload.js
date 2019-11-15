const router = require('koa-router')();
const {SuccessModel} = require("../model/model");
const path = require("path");

router.prefix("/api/file");


router.post("/upload", async (ctx, next) => {
    const fullPath = ctx.request.files.file.path;
    const fileName = path.basename(fullPath);
    ctx.body = new SuccessModel({
        path: path.join('/upload', fileName)
    })
});

module.exports = router;