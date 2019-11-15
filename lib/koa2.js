const http = require("http");

function compose(middleware) {
    return function (ctx) {
        function dispatch(i) {
            const fn = middleware[i];
            try {
                return Promise.resolve(
                    fn(ctx, dispatch.bind(null, i + 1))  // promise
                )
            } catch (err) {
                return Promise.reject(err)
            }
        }

        return dispatch(0)
    }
}

class Koa2 {
    constructor() {
        this.middleware = []
    }

    use(...arg) {
        this.middleware = this.middleware.concat(arg);
    }

    createCtx(req, res) {
        let ctx = {
            req,
            res
        };
        ctx.query = req.query;
        return ctx
    }

    handlerRequest(ctx, fn) {
        return fn(ctx)
    }

    callback() {
        let fn = compose(this.middleware);
        return (req, res) => {
            let ctx = this.createCtx(req, res);
            return this.handlerRequest(ctx, fn)
        }
    }

    listen(...arg) {
        const server = http.createServer(this.callback());
        server.listen(...arg)
    }
}

module.exports = Koa2;