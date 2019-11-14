const router = require('koa-router')();
const path = require('path');
const fs = require('fs');


router.get('/', async (ctx, next) => {
  let fullPath = path.join(__dirname, '../', 'views', 'index.html');
  ctx.response.type = 'html';
  ctx.body = fs.createReadStream(fullPath);
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
});

module.exports = router;
