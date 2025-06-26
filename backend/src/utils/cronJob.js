const cron = require("node-cron");
const Hiring = require("../models/hiringModel");

const runExpiredPostCleanup = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // normalize to 00:00:00

      const result = await Hiring.deleteMany({ lastDate: { $lt: today } });

      const indiaTime = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });

      console.log(
        `[Cron] Deleted ${result.deletedCount} expired hiring posts at ${indiaTime}`
      );
    } catch (error) {
      console.error("[Cron] Error deleting expired posts:", error);
    }
  });
};

module.exports = runExpiredPostCleanup;
