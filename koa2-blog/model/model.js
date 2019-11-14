class BaseModel {
    constructor(data, message) {
        if (typeof data === "string") {
            this.message = data;
            this.result = null;
            return;
        }
        if (data) {
            this.result = data;
        }
        if (message) {
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
};