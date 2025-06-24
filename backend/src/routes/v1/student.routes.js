const express = require("express");
const router = express.Router({ mergeParams: true });
const { StudentController } = require("../../controllers");
const { UserMiddleware, AuthMiddleware } = require("../../middlewares");
const upload = require("../../utils/multer");

// Validate student ID middleware
const validateStudentId = (req, res, next) => {
  if (!req.params.id || req.params.id.length < 12) {
    return res.status(400).json({ error: "Invalid student ID" });
  }
  next();
};

// Routes
router.post("/signup", StudentController.createUser);
router.post("/login", UserMiddleware.validateUser(["email", "password"]), StudentController.loginStudent);

// New GET profile route (added)
router.get("/profile/:id", AuthMiddleware.isLoggedIn, validateStudentId, StudentController.getStudentProfile);

router.put("/profile/:id", AuthMiddleware.isLoggedIn, validateStudentId, upload.single("resume"), StudentController.updateStudentProfile);

router.post("/forgot-password", UserMiddleware.validateUser(["email"]), StudentController.forgorPassword);
router.post("/reset-password/:token", UserMiddleware.validateUser(["newPassword"]), StudentController.resetPassword);

module.exports = router;
