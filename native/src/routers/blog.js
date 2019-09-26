const {
    getList,
    getDetail,
    blogNew,
    blogUpdate,
    blogDel
} = require("../controller/blog");
const {SuccessModel, ErrorModel} = require('../model/resModel');

const handlerBlogRouter = function (req, res) {
    if (req.method === "GET" && req.router === "/api/blog/list") {
        let author = req.query.author || "";
        let keyword = req.query.keyword || "";
        let listData = getList(author, keyword);
        return listData.then(result => {
            return new SuccessModel(result)
        })
    }
    if (req.method === "GET" && req.router === "/api/blog/detail") {
        let id = req.query.id || 0;
        return getDetail(id);
    }
    if (req.method === "POST" && req.router === "/api/blog/new") {
        let result = blogNew(req.body);
        return result.then(res => {
            return new SuccessModel({
                id: res.insertId
            });
        }).catch(err => {
            return new ErrorModel('添加失败');
        })
    }
    if (req.method === "POST" && req.router === "/api/blog/update") {
        let result = blogUpdate(req.body);
        return result.then(res => {
            if (res.affectedRows === 1) {
                return new SuccessModel(res, '修改成功');
            }
            return new ErrorModel('修改失败');
        }).catch(err => {
            return new ErrorModel('修改失败');
        })
    }
    if (req.method === "POST" && req.router === "/api/blog/del") {
        let result = blogDel(req.body);
        return result.then(res => {
            return new SuccessModel(res, '删除成功');
        }).catch(err => {
            return new ErrorModel('删除失败');
        })
    }
};

module.exports = handlerBlogRouter;
