const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/badRequest");
const NotFoundError = require("../errors/notFound");
const UnauthorizedError = require("../errors/unauthorizedError");
const { AdminRepository,StudentRepository } = require("../repositories");
const Auth = require("../utils/common/Auth");
const Student = require("../models/studentModel");
const adminRepository = new AdminRepository();
const studentRepository=new StudentRepository();

// Helper to handle mongoose validation errors uniformly
function handleValidationError(error) {
  if (error.name === "ValidationError") {
    const errors = Object.keys(error.errors).map((field) => ({
      field,
      message: error.errors[field].message,
    }));
    throw new BadRequestError(
      "Validation failed for the provided data. Please correct the errors and try again.",
      errors
    );
  }
  throw error;
}
async function getWeekAnalysis(){
  try{
    const data=await adminRepository.getUserSignupsPerDayThisWeek();
    return data;
  }
  catch(error){
    throw error;
  }
}
async function createAdmin(adminData) {
  try {
    const existingAdmin = await adminRepository.findByEmail(adminData.email);
    if (existingAdmin) {
      throw new BadRequestError(
        "Admin already exists with this email",
        adminData.email
      );
    }
    const admin = await adminRepository.create(adminData);
    const token = Auth.generateToken({ role: admin.role, id: admin._id });
    return { admin, token };
  } catch (error) {
    handleValidationError(error);
  }
}

async function signIn(data) {
  try {
    const user = await adminRepository.findByEmail(data.email);
    if (!user) {
      throw new NotFoundError("Admin", data.email);
    }
    const passwordMatch = await Auth.checkPassword(data.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError(
        "Invalid credentials",
        `The password you entered for ${data.email} is incorrect. Please try again.`
      );
    }
    const token = Auth.generateToken({ role: user.role, id: user._id });
    return { user, token };
  } catch (error) {
    handleValidationError(error);
  }
}

async function deleteAdmin(id) {
  try {
    const admin = await adminRepository.get(id);

    if (!admin) {
      throw new NotFoundError("Admin", id);
    }
    if (admin.role === "superadmin") {
      throw new BadRequestError(
        "Cannot delete superadmin",
        "Superadmin account cannot be deleted."
      );
    }
    const response = await adminRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new NotFoundError("Admin", id);
    }
    throw error;
  }
}

async function getAllAdmins(){
  try {
    const admins=await adminRepository.getAllAdmins();
    return admins;
  } catch (error) {
    throw new BadRequestError("Failed to fetch admin list",error);
  }
}

async function getStats(){
  try{
    const stats=await adminRepository.getStats();
    return stats;
  }
  catch(error){
    throw new BadRequestError("Failed to get stats",error);
  }
}

async function getBranchStats() {
  const result = await Student.aggregate([
    {
      $group: {
        _id: "$department",       // Group by branch field
        count: { $sum: 1 },   // Count students per branch
      },
    },
    {
      $sort: { count: -1 },   // Optional: sort by number of students descending
    },
  ]);

  const formatted = {};
  result.forEach((item) => {
    formatted[item._id] = item.count;
  });

  return formatted;
}

module.exports = {
  createAdmin,
  signIn,
  deleteAdmin,
  getAllAdmins,
  getStats,
  getBranchStats,
  getWeekAnalysis
};
