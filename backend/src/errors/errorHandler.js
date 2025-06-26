const { StatusCodes } = require("http-status-codes");

function errorHandler(err, req, res, next) {
  // ✅ Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));

    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      data: {},
      error:
        process.env.NODE_ENV === "development"
          ? {
              name: err.name,
              message: err.message,
              stack: err.stack,
              details: errors,
            }
          : undefined,
    });
  }

  // ✅ Default error handler
  const isOperational = err.statusCode && err.code;
  const statusCode = isOperational
    ? err.statusCode
    : StatusCodes.INTERNAL_SERVER_ERROR;
  const message = isOperational ? err.message : "Internal Server Error";
  const code = isOperational ? err.code : "INTERNAL_ERROR";

  res.status(statusCode).json({
    success: false,
    message,
    code,
    data: {},
    error:
      process.env.NODE_ENV === "development"
        ? {
            name: err.name,
            message: err.message,
            code: err.code,
            stack: err.stack,
            details: err.details || null,
          }
        : undefined,
  });
}

module.exports = errorHandler;
