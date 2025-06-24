const BaseError = require("./baseError");

class BadRequestError extends BaseError {
  constructor(message, details = null, code = "BAD_REQUEST") {
    super(message, 400, code, details);
  }
}

// class BadRequestError extends Error {
//   constructor(message, description) {
//     super(message);
//     this.name = "BadRequestError";
//     this.statusCode = 400;
//     this.description = description || null;
//   }
// }

class NotFoundError extends Error {
  constructor(message, description) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.description = description || null;
  }
}

class CustomError extends Error {
  constructor(message, statusCode, code = "INTERNAL_ERROR", description = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.description = description;
  }
}


class UnauthorizedError extends CustomError {
  constructor(message, description = null, code = "UNAUTHORIZED") {
    super(message, 401, code, description);
  }
}

// module.exports = {
//   CustomError,
//   BadRequestError,
//   UnauthorizedError,
// };


module.exports = {
  BadRequestError,
  CustomError,
  NotFoundError,
  UnauthorizedError,
};
