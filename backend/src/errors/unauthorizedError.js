const BaseError = require("./baseError");
const { StatusCodes } = require("http-status-codes");

class UnauthorizedError extends BaseError {
  constructor(message, details = null, code = "UNAUTHORIZED") {
    super(message, details, code, StatusCodes.UNAUTHORIZED);
  }
}

module.exports = UnauthorizedError;
