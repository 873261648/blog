let {SuccessModel, ErrorModel} = require("../model/resModel");

const getList = (author, keyword) => {
    let list = [{
        id: 1,
        title: "标题一",
        content: "aaaaaa",
        author: "zhangsan",
        createTime: 1569160326363
    }, {
        id: 2,
        title: "标题二",
        content: "bbbbbb",
        author: "lisi",
        createTime: 1569160326363
    }];
    return new SuccessModel(list)
};
const getDetail = (id) => {
    if (!id) {
        return new ErrorModel('id required')
    }
    return new SuccessModel({
        id,
        title: "标题一",
        content: "aaaaaa",
        author: "zhangsan",
        createTime: 1569160326363
    })
};

const blogNew = (data = {}) => {
    console.log(data);
    // 新建成功后的文章ID
    return {
        id: 3
    }
};
const blogUpdate = (data = {}) => {
    console.log(data);
    return new SuccessModel();
    // return new ErrorModel('更新失败')
};
const blogDel = (data = {}) => {
    console.log(data);
    // return new SuccessModel();
    return new ErrorModel('删除失败')
};

module.exports = {
    getList,
    getDetail,
    blogNew,
    blogUpdate,
    blogDel
};
