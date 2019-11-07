const http = require('http');
const splice = Array.prototype.splice;

class Express {
    constructor() {
        this.routers = {
            all: [],
            get: [],
            post: []
        }
    };
    register(path) {
        let info = {};
        if (typeof path === 'string') {
            info.path = path;
            info.stack = splice.call(arguments, 1);
        } else {
            info.path = '/';
            info.stack = splice.call(arguments, 0);
        }
        return info;
    }
    use() {
        let info = this.register.apply(this, arguments);
        this.routers.all.push(info);
    };
    get() {
        let info = this.register.apply(this, arguments);
        this.routers.get.push(info);
    };
    post() {
        let info = this.register.apply(this, arguments);
        this.routers.post.push(info);
    };


    match(url, method) {
        if (url === '/favicon.ico') {
            return []
        }
        let curRoutes = [];
        curRoutes = curRoutes.concat(this.routers.all);
        curRoutes = curRoutes.concat(this.routers[method])

        let resultList = [];

        curRoutes.map(item => {
            if (url.indexOf(item.path) === 0) {
                resultList = resultList.concat(item.stack)
            }
        })
        return resultList
    }
    handler(req, res, stack) {
        let next = () => {
            let middleWare = stack.shift()
            if (middleWare) {
                middleWare(req, res, next);
            }
        }
        next();
    }

    callback() {
        return (req, res) => {
            res.setHeader('Content-type', 'application/json')
            res.json = function (data) {
                res.end(JSON.stringify(data))
            }

            let url = req.url;
            let method = req.method.toLowerCase();
            let resultList = this.match(url, method)

            this.handler(req, res, resultList)
        }
    };
    listen(...arg) {
        const server = http.createServer(this.callback());
        server.listen(...arg)
    };
}




module.exports = Express;