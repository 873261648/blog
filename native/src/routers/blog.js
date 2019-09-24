const {
    getList,
    getDetail,
    blogNew,
    blogUpdate,
    blogDel
} = require("../controller/blog");

const handlerBlogRouter = function (req, res) {
    if (req.method === "GET" && req.router === "/api/blog/list") {
        let author = req.query.author || "";
        let keyword = req.query.keyword || "";
        return getList(author, keyword)
    }
    if (req.method === "GET" && req.router === "/api/blog/detail") {
        let id = req.query.id || 0;
        return getDetail(id);
    }
    if (req.method === "POST" && req.router === "/api/blog/new") {
        return blogNew(req.body);
    }
    if (req.method === "POST" && req.router === "/api/blog/update") {
        return blogUpdate(req.body)
    }
    if (req.method === "POST" && req.router === "/api/blog/del") {
        return blogDel(req.body)
    }
};

module.exports = handlerBlogRouter;
