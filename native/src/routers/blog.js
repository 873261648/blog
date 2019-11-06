const {
    getList,
    getDetail,
    blogNew,
    blogUpdate,
    blogDel
} = require("../controller/blog");
const {SuccessModel, ErrorModel} = require('../model/resModel');

// 登录状态验证
function loginCheck(req) {
    if (!req.session.username) {
        return Promise.resolve().then(() => {
            return new ErrorModel('尚未登录');
        })
    }
}

const handlerBlogRouter = function (req, res) {
    if (req.method === "GET" && req.router === "/api/blog/list")
        let author = req.query.author || "";{
        let keyword = req.query.keyword || "";
        let listData = getList(author, keyword);
        return listData.then(result => {
            return new SuccessModel(result)
        })
    }
    if (req.method === "GET" && req.router === "/api/blog/detail") {
        let id = req.query.id || 0;
        let result = getDetail(id);
        return result.then(res => {
            return new SuccessModel(res);
        }).catch(err => {
            return new ErrorModel('查询失败', err);
        });
    }
    if (req.method === "POST" && req.router === "/api/blog/new") {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult
        }

        let result = blogNew({
            ...req.body,
            author: req.session.username
        });
        return result.then(insertId => {
            return new SuccessModel({
                id: insertId
            });
        }).catch(err => {
            return new ErrorModel('添加失败', err);
        })
    }
    if (req.method === "POST" && req.router === "/api/blog/update") {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult
        }

        let result = blogUpdate(req.body);
        return result.then(res => {
            if (res) {
                return new SuccessModel(res, '修改成功');
            } else {
                return new ErrorModel('修改失败');
            }
        })
    }
    if (req.method === "POST" && req.router === "/api/blog/del") {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult
        }

        let author = req.session.username;
        let result = blogDel(req.body, author);
        return result.then(res => {
            if (res) {
                return new SuccessModel('删除成功');
            } else {
                return new ErrorModel('删除失败');
            }
        })
    }
};

module.exports = handlerBlogRouter;
