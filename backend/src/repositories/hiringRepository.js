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
}

module.exports = HiringRepository;
