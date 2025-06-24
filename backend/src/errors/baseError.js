class BaseError extends Error {
  constructor(message, details = null, code = "INTERNAL_ERROR", statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.details = details;
    this.code = code;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}


module.exports = BaseError;
