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
router.get('/week',AuthMiddleware.isLoggedIn,
  AdminController.getWeeklySignups
)
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
router.get('/all',
  // AuthMiddleware.requireSuperadmin,
  AdminController.getAllAdmins
);
router.get('/stats',
  AuthMiddleware.isLoggedIn
  ,AuthMiddleware.requireAdmin,AdminController.getStats);

router.get('/students',
  AuthMiddleware.isLoggedIn
  ,AuthMiddleware.requireAdmin,AdminController.getAllStudents)
// router.get(
//   "/",
//   AuthMiddleware.isLoggedIn,
//   AuthMiddleware.requireSuperadmin,
//   AdminController.getAllAdmins
// );
router.get(
  "/students/branch-stats",
  AuthMiddleware.isLoggedIn,
  // AuthMiddleware.requireAdmin,
  AdminController.getBranchStats
);
module.exports = router;
