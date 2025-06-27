const { StatusCodes } = require("http-status-codes");
const { StudentService } = require("../services");

const createUser = async (req, res, next) => {
  try {
    const result = await StudentService.signup(req.body);
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const loginStudent = async (req, res, next) => {
  try {
    const result = await StudentService.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getStudentProfile = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const student = await StudentService.getStudentProfile(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

const parseIfStringifiedArray = (input) => {
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {
      // Do nothing if invalid JSON
    }
  }
  return input;
};

const updateStudentProfile = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    let updateData = { ...req.body };

    // ✅ Safely parse these fields
    updateData.skills = parseIfStringifiedArray(updateData.skills);
    updateData.achievements = parseIfStringifiedArray(updateData.achievements);

    // ✅ Handle resume upload
    if (req.file) {
      updateData.resume = `/uploads/resumes/${req.file.filename}`;
    }

    const updatedStudent = await StudentService.updateStudentProfile(
      studentId,
      updateData
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

const forgorPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await StudentService.requestPasswordReset(email);
    res.status(StatusCodes.OK).json({
      success: true,
      message: result.message,
      resetToken: result.resetToken,
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    await StudentService.resetPassword(token, newPassword);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  loginStudent,
  updateStudentProfile,
  getStudentProfile,
  forgorPassword,
  resetPassword,
};
