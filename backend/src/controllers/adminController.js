const { StatusCodes } = require("http-status-codes");
const { AdminService, StudentService } = require("../services");

async function createAdmin(req, res, next) {
  try {
    const admin = await AdminService.createAdmin({
      name:req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (error) {
    next(error);
  }
}

async function signIn(req, res, next) {
  try {
    const { user, token } = await AdminService.signIn({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Admin signed in successfully",
      token,
      data: {
        id: user.id,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteAdmin(req, res, next) {
  try {
    const { id } = req.params;
    const response = await AdminService.deleteAdmin(id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Admin deleted successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
async function getAllAdmins(req,res,next){
  try{
    const response=await AdminService.getAllAdmins();
    return res.status(StatusCodes.OK).json({
      success:true,
      message:"All admins fetched successfully",
      data:response
    })
  }
  catch(error){
    next(error);
  }
}
async function getStats(req,res,next){
  try{
    const response=await AdminService.getStats();
    return res.status(StatusCodes.OK).json({
      success:true,
      message:"Fetched all details",
      data:response
    })
  }
  catch(error){
    next(error);
  }
}
async function getAllStudents(req, res, next) {
  try {
    const students = await StudentService.getAllStudentsWithFilters(req.query);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    next(error);
  }
}
async function getBranchStats(req,res,next){
  try {
    const data = await AdminService.getBranchStats();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
    console.error("Error in getBranchStats:", error);
    res.status(500).json({ message: "Failed to fetch branch statistics" });
  }

}

async function getWeeklySignups(req, res,next)  {
  try {
    const data = await AdminService.getWeekAnalysis();
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching signup data" });
  }
};
module.exports = {
  createAdmin,
  signIn,
  deleteAdmin,
  getAllAdmins,
  getStats,
  getAllStudents,
  getBranchStats,
  getWeeklySignups
};
