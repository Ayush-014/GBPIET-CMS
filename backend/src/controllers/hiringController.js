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
      stipend,
      opportunityLink,
      batch,
      departments,
      description,
      qualifications,
      type,
    } = req.body;

    // Optionally validate again or log
    // console.log("Creating hiring post with data:", req.body);

    const post = await HiringService.createHiring({
      companyName,
      role,
      location,
      lastDate,
      eligibility,
      stipend,
      opportunityLink,
      batch,
      departments,
      description,
      qualifications,
      type,
      createdBy: req.user?.id,
    });
    console.log(post);

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
    // const { all } = req.query;
    // const role = req.user?.role;
    // const department = req.user?.department;

    // const query = { ...req.query };

    // if (role === "student" && all !== "true" && !req.query.departments) {
    //   query.departments = department;
    // }

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
async function getHiring(req, res, next) {
  try {
    const postId = req.params.id;
    const post = await HiringService.getHiring(postId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Hiring post fetched successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
}
async function getPostByType(req, res, next) {
  try {
    const { type } = req.params;
    const posts = await HiringService.getHiringByType(type);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Hiring posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
}
// controllers/hiringController.js
async function getLatestPosts(req, res, next) {
  try {
    const { limit } = req.query;
    const posts = await HiringService.getLatestHiringPosts(limit); // can make this dynamic
    console.log("Latest posts fetched:", posts.length);
    return res.status(200).json({
      success: true,
      message: "Latest hiring posts fetched successfully",
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
  getHiring,
  getPostByType,
  getLatestPosts,
};
