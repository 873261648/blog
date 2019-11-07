const Express = require('./express2');
const loginCheck = require('./loginCheck');

const app = new Express();

app.use((req, res, next) => {
    console.log('处理cookie');
    next();
})
app.use((req, res, next) => {
    req.session = req.session || {}
    req.session.username = 'sucheon';
    console.log('处理post数据');
    next();
})
app.use((req, res, next) => {
    req.body = {
        erron: 0,
        message: "111"
    };
    console.log('处理session');
    next();
})

app.get("/", (req, res, next) => {
    res.json(req.body)
})


app.listen(3000, () => {
    console.log('server run at http://localhost:3000/')
})