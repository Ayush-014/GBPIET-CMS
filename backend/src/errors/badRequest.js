const BaseError = require("./baseError");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends BaseError {
  constructor(message = "Bad Request", details = null) {
    super("BadRequestError", StatusCodes.BAD_REQUEST, message, details);
  }
}

module.exports = BadRequestError;
