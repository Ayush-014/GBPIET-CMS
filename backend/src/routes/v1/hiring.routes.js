const express = require("express");
const router = express.Router();

const { HiringController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");

router.post(
  "/post",
  AuthMiddleware.isLoggedIn,
  AuthMiddleware.requireAdmin,
  HiringController.createHiring
);

router.get("/getopp", AuthMiddleware.isLoggedIn, HiringController.getHiringPosts);

router.get("/latest", AuthMiddleware.isLoggedIn, HiringController.getLatestPosts);

router.get(
  "/type/:type",
  AuthMiddleware.isLoggedIn,
  HiringController.getPostByType
);

router.get("/:id", AuthMiddleware.isLoggedIn, HiringController.getHiring);

router.delete(
  "/:id",
  AuthMiddleware.isLoggedIn,
  AuthMiddleware.requireAdmin,
  HiringController.deletePost
);

module.exports = router;
