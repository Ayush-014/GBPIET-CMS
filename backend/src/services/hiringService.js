const { HiringRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/badRequest");
const NotFoundError = require("../errors/notFound");
const hiringRepository = new HiringRepository();

// Shared helper for mongoose ValidationError
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

async function createHiring(hiringData) {
  try {
    return await hiringRepository.create(hiringData);
  } catch (error) {
    handleValidationError(error);
  }
}

async function getHiringByDepartment(department) {
  try {
    return await hiringRepository.findByDepartment(department);
  } catch (error) {
    // You might want to throw a NotFoundError if no posts exist for a department
    throw error;
  }
}

async function deleteExpiredHiringPosts() {
  try {
    return await hiringRepository.deleteExpiredPost();
  } catch (error) {
    throw error;
  }
}

async function deletePosts(id) {
  try {
    const deleted = await hiringRepository.destroy(id);
    if (!deleted) {
      throw new NotFoundError("Hiring post", id);
    }
    return deleted;
  } catch (error) {
    throw error;
  }
}

async function getAllHiring(query) {
  try {
    // Build filter
    const filter = {};
    if (query.location) {
      filter.location = { $regex: query.location, $options: "i" };
    }
    if (query.companyName) {
      filter.companyName = { $regex: query.companyName, $options: "i" };
    }
    if (query.departments) {
      filter.departments = { $in: [query.departments] };
    }

    // Build sort
    const sort = {};
    if (query.sort) {
      query.sort.split(",").forEach((param) => {
        const [field, dir] = param.split("_");
        sort[field] = dir === "desc" ? -1 : 1;
      });
    }

    // Pagination defaults
    const page  = query.page && parseInt(query.page, 10) > 0 ? parseInt(query.page, 10) : 1;
    const limit = query.limit && parseInt(query.limit, 10) > 0 ? parseInt(query.limit, 10) : 10;
    const skip  = (page - 1) * limit;

    return await hiringRepository.getAllHiring(filter, sort, skip, limit);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createHiring,
  getHiringByDepartment,
  deleteExpiredHiringPosts,
  deletePosts,
  getAllHiring,
};
