const { StatusCodes } = require("http-status-codes");
const { HiringService } = require("../services");

async function createHiring(req, res, next) {
  try {
    const {
      companyName,
      role,
      location,
      lastDate,
      eligibility,
      batch,
      description,
      qualifications,
      departments,
      type,
    } = req.body;

    // Optionally validate again or log
    console.log("Creating hiring post with data:", req.body);

    const post = await HiringService.createHiring({
      companyName,
      role,
      location,
      lastDate,
      eligibility,
      batch,
      description,
      qualifications,
      departments,
      type,
      createdBy: req.user?.id,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Hiring post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
}


async function deletePost(req, res, next) {
  try {
    const postId = req.params.id;
    const deletedPost = await HiringService.deletePosts(postId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Hiring post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    next(error);
  }
}

async function getHiringPosts(req, res, next) {
  try {
    const { all } = req.query;
    const role = req.user?.role;
    const department = req.user?.department;

    const query = { ...req.query };

    if (role === "student" && all !== "true" && !req.query.departments) {
      query.departments = department;
    }

    const posts = await HiringService.getAllHiring(query);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Hiring posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createHiring,
  getHiringPosts,
  deletePost,
};
