const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/badRequest");
const NotFoundError = require("../errors/notFound");
const UnauthorizedError = require("../errors/unauthorizedError");
const { AdminRepository } = require("../repositories");
const Auth = require("../utils/common/Auth");
const adminRepository = new AdminRepository();

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
module.exports = {
  createAdmin,
  signIn,
  deleteAdmin,
  getAllAdmins,
  getStats
};
