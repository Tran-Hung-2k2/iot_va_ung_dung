class BaseError extends Error {
    constructor(statusCode, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.statusCode = statusCode;

        Error.captureStackTrace(this);
    }
}

class APIError extends BaseError {
    constructor(statusCode = 500, message = 'Có lỗi xảy ra vui lòng thử lại sau') {
        super(statusCode, message);
    }
}

export default APIError;
