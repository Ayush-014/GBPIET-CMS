const BaseError = require("./baseError");
const { StatusCodes } = require("http-status-codes");

class NotFoundError extends BaseError {
  constructor(resourceName = "Resource", identifier = "") {
    const description = identifier
      ? `The requested ${resourceName} with identifier "${identifier}" was not found.`
      : `The requested ${resourceName} was not found.`;

    super("NotFoundError", StatusCodes.NOT_FOUND, description, {
      resourceName,
      identifier,
    });
  }
}

module.exports = NotFoundError;
