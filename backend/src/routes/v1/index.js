const express = require("express");
const router = express.Router();

const studentRoutes = require("./student.routes");
const adminRoutes = require("./admin.routes");
const hiringRoutes = require("./hiring.routes");
const { InfoController } = require("../../controllers");

router.get("/info", InfoController.info);
router.use("/students", studentRoutes);
router.use("/admin", adminRoutes);
router.use("/hiring", hiringRoutes);

module.exports = router;
