const BaseError = require("./baseError");
const { StatusCodes } = require("http-status-codes");

class ForbiddenError extends BaseError {
  constructor(message = "Forbidden", details = null) {
    super("ForbiddenError", StatusCodes.FORBIDDEN, message, details);
  }
}

module.exports = ForbiddenError;
