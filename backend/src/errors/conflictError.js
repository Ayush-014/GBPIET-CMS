const BaseError = require("./baseError");
const { StatusCodes } = require("http-status-codes");

class ConflictError extends BaseError {
  constructor(message = "Conflict occurred", details = null) {
    super("ConflictError", StatusCodes.CONFLICT, message, details);
  }
}

module.exports = ConflictError;
