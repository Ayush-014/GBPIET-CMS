const { UnauthorizedError } = require("../errors/customErrors");
const Student = require("../models/studentModel");
const CrudRepository = require("./crudRepository");
const crypto = require("crypto");

class StudentRepository extends CrudRepository {
  constructor() {
    super(Student, "Student");
  }

  async findByEmail(email) {
    return Student.findOne({ email });
  }

  async findByInstituteId(instituteId) {
    return Student.findOne({ instituteId });
  }

  async updateStudentProfile(id, data) {
    return Student.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  }

  async findById(id) {
    return Student.findById(id);
  }

  async generatePasswordResetToken(email) {
    const student = await Student.findOne({ email });
    if (!student) throw new UnauthorizedError("No user found with this email", { email });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    student.resetPasswordToken = hashedToken;
    student.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await student.save({ validateBeforeSave: false });

    return { resetToken, student };
  }

  async findByResetToken(hashedToken) {
    return Student.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
  }

  async updatePassword(studentId, newPassword) {
    const student = await Student.findById(studentId);
    student.password = newPassword;
    student.resetPasswordToken = undefined;
    student.resetPasswordExpires = undefined;
    await student.save();
    return student;
  }
}

module.exports = StudentRepository;
