class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
        }
        if (data) {
            this.result = data;
        }
        if (message) {
            this.message = message;
        }
    }
}
// 成功返回
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = 0;
    }
}
// 失败
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = -1;
    }
}
// 会话失效
class sessionInvalidModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = -2;
    }
}


module.exports = {
    SuccessModel,
    ErrorModel,
    sessionInvalidModel
};