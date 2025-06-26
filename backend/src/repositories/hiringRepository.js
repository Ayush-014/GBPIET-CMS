const Hiring = require("../models/hiringModel");
const CrudRepository = require("./crudRepository");

class HiringRepository extends CrudRepository {
  constructor() {
    super(Hiring, "Hiring");
  }

  async findByDepartment(department) {
    try {
      const hiring = await Hiring.find({
        departments: { $in: [department] },
      }).sort({ lastDate: 1 });
      return hiring;
    } catch (error) {
      throw error;
    }
  }

  async deleteExpiredPost() {
    try {
      const currentDate = new Date();
      const expiredPosts = await Hiring.deleteMany({
        lastDate: { $lt: currentDate },
      });
      return expiredPosts;
    } catch (error) {
      throw error;
    }
  }

  async getAllHiring(filter = {}, sort = {}, skip = 0, limit = 10) {
    try {
      const response = await Hiring.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

      return response;
    } catch (error) {
      throw error;
    }
  }
  async postByType(type) {
    try {
      const hiring = await Hiring.find({ type }).sort({ lastDate: 1 });
      return hiring;
    } catch (error) {
      throw error;
    }
  }
  async latestPosts(limit = 5) {
    try {
      console.log("→ Repository: latestPosts limit=", limit);
      const posts = await Hiring.find().sort({ createdAt: -1 }).limit(limit);
      console.log("← Repository: found", posts.length, "posts");
      return posts;
    } catch (error) {
      console.error("Error in latestPosts:", error);
      throw error;
    }
  }
}

module.exports = HiringRepository;
