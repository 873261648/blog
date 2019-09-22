class BaseModel {
    constructor(result, message) {
        if (typeof result === "string") {
            this.result = result;
            result = null;
            message = null;
        }
        if (result) {
            this.result = result
        }
        if (message) {
            this.result = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(result, message) {
        super(result, message);
        return {
            errno: 0,
            result: this.result
        }
    }
}

class ErrorModel extends BaseModel {
    constructor(result, message) {
        super(result, message);
        return {
            errno: -1,
            message: this.result
        }
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
};