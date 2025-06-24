// authMiddleware.js
const UnauthorizedRequest = require("../errors/unauthorizedError");
const Auth = require("../utils/common/Auth");

function isLoggedIn(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new UnauthorizedRequest(
        "Invalid credentials.",
        "You must be logged in to access this resource."
      )
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = Auth.verifyToken(token);
    if (!decodedToken.id || !decodedToken.role) {
      return next(
        new UnauthorizedRequest(
          "Invalid token.",
          "Authentication token is invalid."
        )
      );
    }
    req.user = {
      id: decodedToken.id,
      role: decodedToken.role,
      department: decodedToken.department || null,
    };
    next();
  } catch {
    return next(
      new UnauthorizedRequest(
        "Invalid credentials.",
        "You must be logged in to access this resource."
      )
    );
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "superadmin" && req.user.role !== "admin") {
    return next(
      new UnauthorizedRequest(
        "Access denied.",
        "You do not have permission to access this resource."
      )
    );
  }
  next();
}

function requireSuperadmin(req, res, next) {
  if (req.user.role !== "superadmin") {
    return next(
      new UnauthorizedRequest(
        "Access denied.",
        "You do not have permission to access this resource."
      )
    );
  }
  next();
}

module.exports = {
  isLoggedIn,
  requireAdmin,
  requireSuperadmin,
};
