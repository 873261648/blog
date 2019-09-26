const {SuccessModel, ErrorModel} = require('../model/resModel');

const login = (data = {}) => {
    console.log(data);
    if (data.userName === 'sucheon' && data.password === 'sucheon') {
        return new SuccessModel('登录成功');
    } else {
        return new ErrorModel('用户名或密码错误');
    }
};
module.exports = {
    login
};
