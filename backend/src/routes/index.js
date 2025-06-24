const express = require("express");
const router = express.Router();

const v1Routes = require("./v1");

router.get("/test", (req, res) => {
  res.json({ message: "Test route works!" });
});

router.use("/v1", v1Routes);

module.exports = router;
