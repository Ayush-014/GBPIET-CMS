const express = require("express");
const router = express.Router();

const { AdminController } = require("../../controllers");
const { AuthMiddleware, UserMiddleware } = require("../../middlewares");

router.post(
  "/register",
  AuthMiddleware.isLoggedIn,
  AuthMiddleware.requireSuperadmin,
  AdminController.createAdmin
);

router.post(
  "/login",
  UserMiddleware.validateUser(["email", "password"]),
  AdminController.signIn
);

router.delete(
  "/:id",
  AuthMiddleware.isLoggedIn,
  AuthMiddleware.requireSuperadmin,
  AdminController.deleteAdmin
);

module.exports = router;
