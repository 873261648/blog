const {SuccessModel, ErrorModel} = require('../model/resModel');

const login = (data = {}) => {
    console.log(data)
    return new SuccessModel({
        token:"bxyhsavxyhujvsahjxvhjsav"
    });
    // return new ErrorModel('用户名或密码错误');
};
module.exports = {
    login
};
