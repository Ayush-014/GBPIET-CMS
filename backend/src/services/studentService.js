const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const StudentRepository = require("../repositories/studentRepository");
const studentRepository = new StudentRepository();
const { BadRequestError, UnauthorizedError } = require("../errors/customErrors");
const sendEmail = require("../utils/mailhandler");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signup = async (data) => {
  if (!passwordPattern.test(data.password)) {
    throw new BadRequestError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
  }
  const existingUser = await studentRepository.findByEmail(data.email);
  if (existingUser) throw new BadRequestError("Email already in use, kindly Login.");

  const newStudent = await studentRepository.create(data);
  console.log(newStudent);
  return {
    message: "Student registered successfully.",
    data: {
      name: newStudent.name,
      email: newStudent.email,
      instituteId: newStudent.instituteId,
      department: newStudent.department,
      batch: newStudent.batch,
      _id: newStudent._id,
    },
  };
};

const login = async ({ email, password }) => {
  const student = await studentRepository.findByEmail(email);
  if (!student) throw new UnauthorizedError("Invalid credentials");

  const valid = await bcrypt.compare(password, student.password);
  if (!valid) throw new UnauthorizedError("Invalid credentials");

  const token = jwt.sign(
    { id: student._id, role: "student", department: student.department },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    message: "Login successful",
    token,
    data: {
      name: student.name,
      email: student.email,
      instituteId: student.instituteId,
      department: student.department,
      batch: student.batch,
      _id: student._id,
    },
  };
};

async function updateStudentProfile(id, data) {
  const updatedStudent = await studentRepository.updateStudentProfile(id, data);
  if (!updatedStudent) {
    throw new BadRequestError("Student not found", { id });
  }
  return updatedStudent;
}

async function getStudentProfile(id) {
  const student = await studentRepository.findById(id);
  return student;
}

async function requestPasswordReset(email) {
  const { resetToken, student } = await studentRepository.generatePasswordResetToken(email);
  const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
  await sendEmail({ to: student.email, name: student.name, resetURL });

  return { success: true, message: "Password reset link sent to your email", resetToken };
}

async function resetPassword(token, newPassword) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const student = await studentRepository.findByResetToken(hashedToken);
  if (!student) throw new UnauthorizedError("Invalid or expired reset token");

  await studentRepository.updatePassword(student._id, newPassword);
  return true;
}
async function getAllStudentsWithFilters(filters) {
  const query = {};

  // 🔍 Filters
  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" };
  }

  if (filters.cgpaMin || filters.cgpaMax) {
    query.cgpa = {};
    if (filters.cgpaMin) query.cgpa.$gte = parseFloat(filters.cgpaMin);
    if (filters.cgpaMax) query.cgpa.$lte = parseFloat(filters.cgpaMax);
  }

  if (filters.skills) {
    const skillArray = filters.skills.split(",").map((s) => s.trim());
    query.skills = { $in: skillArray };
  }

  if (filters.achievements) {
    const achievementArray = filters.achievements.split(",").map((a) => a.trim());
    query.achievements = { $in: achievementArray };
  }

  if (filters.batch) {
    query.batch = filters.batch;
  }

  // 📦 Sorting
  const sort = {};
  if (filters.sortBy === "cgpa") {
    sort.cgpa = filters.order === "asc" ? 1 : -1;
  }

  // 🔢 Limit
  const limit = filters.limit ? parseInt(filters.limit) : 0; // 0 means no limit

  // 🔄 Execute query
  const students = await studentRepository.findWithFilters(query, sort, limit);
  return students;
}

module.exports = {
  signup,
  login,
  updateStudentProfile,
  getStudentProfile,
  requestPasswordReset,
  resetPassword,
  getAllStudentsWithFilters
};
