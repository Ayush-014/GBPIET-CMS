const cron = require("node-cron");
const Hiring = require("../models/hiringModel"); // Adjust as needed

const runExpiredPostCleanup = () => {
  // Run every day at midnight
  cron.schedule("0 0 * * *", async () => {
    try {
      const now = new Date();
      const result = await Hiring.deleteMany({ lastDate: { $lt: now } });
      console.log(
        `[Cron] Deleted ${
          result.deletedCount
        } expired hiring posts at ${now.toISOString()}`
      );
    } catch (error) {
      console.error("[Cron] Error deleting expired posts:", error);
    }
  });
};

module.exports = runExpiredPostCleanup;
