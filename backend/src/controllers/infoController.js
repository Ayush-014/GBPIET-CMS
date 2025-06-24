const { StatusCodes } = require("http-status-codes");

const info = (req, res, next) => {
  console.log("Inside infoController");
  try {
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "API is live",
      data: {}, // `error: {}` is unnecessary here
    });
  } catch (error) {
    next(error); // Pass errors to global error handler
  }
};

module.exports = {
  info,
};
