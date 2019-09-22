const {getList} = require("../controller/blog");

const handlerBlogRouter = function (req, res) {
    if (req.method === "GET" && req.router === "/api/blog/list") {
        let author = req.query.author || "";
        let keyword = req.query.keyword || "";
        return getList(author,keyword)
    }
    if (req.method === "GET" && req.router === "/api/blog/detail") {
        return {
            message: "获取详情失败"
        }
    }
    if (req.method === "POST" && req.router === "/api/blog/new") {
        return {
            message: "新增一条博客"
        }
    }
    if (req.method === "POST" && req.router === "/api/blog/update") {
        return {
            message: "更新一条博客"
        }
    }
    if (req.method === "POST" && req.router === "/api/blog/del") {
        return {
            message: "删除一条博客"
        }
    }
};

module.exports = handlerBlogRouter;