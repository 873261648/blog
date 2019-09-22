let {SuccessModel, ErrorModel} = require("../model/resModel");

const getList = (author, keyword) => {
    let list = [{
        id:1,
        title:"标题一",
        content:"aaaaaa",
        author:"zhangsan",
        createTime:1569160326363
    },{
        id:2,
        title:"标题二",
        content:"bbbbbb",
        author:"lisi",
        createTime:1569160326363
    }];
    console.log(author, keyword);
    return new SuccessModel(list)
};

module.exports = {
    getList
};