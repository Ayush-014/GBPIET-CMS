const Admin = require("../models/adminModel");
const CrudRepository = require("./crudRepository");

class AdminRepository extends CrudRepository {
  constructor() {
    super(Admin, "Admin");
  }

  async findByEmail(email) {
    try {
      const admin = await Admin.findOne({ email });
      return admin;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdminRepository;
