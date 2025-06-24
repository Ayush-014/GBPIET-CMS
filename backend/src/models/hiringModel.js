const mongoose = require("mongoose");

const hiringPostSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: [2, "Company name must be at least 2 characters long"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },
    lastDate: {
      type: Date,
      required: [true, "Last date to apply is required"],
      validate: {
        validator: function (value) {
          const now = new Date();
          const oneMinuteLater = new Date(now.getTime() + 60 * 1000);
          return value > oneMinuteLater;
        },
        message: "Last date must be at least 1 minute in the future",
      },
    },
    departments: {
      type: [String],
      required: [true, "At least one department must be selected"],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Departments array cannot be empty",
      },
      enum: {
        values: ["CSE", "ECE", "ME", "CE", "CSE (AIML)", "EE", "BT"],
        message: "{VALUE} is not a valid department",
      },
    },
    type: {
      type: String,
      enum: ["job", "internship", "training"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const Hiring = mongoose.model("Hiring", hiringPostSchema);
module.exports = Hiring;
