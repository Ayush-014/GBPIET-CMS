const mongoose = require("mongoose");

const hiringPostSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: [2, "Company name must be at least 2 characters long"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
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
    qualifications: {
      type: String,
      required: [true, "Qualifications are required"],
      minlength: [5, "Qualifications must be at least 5 characters long"],
    },
    lastDate: {
      type: Date,
      required: [true, "Last date to apply is required"],
    },
    stipend: {
      type: String,
      required: [true, "Stipend is required"],
    },
    duration: {
      type: String,
    },
    eligibility: {
      type: String,
      required: [true, "Eligibility is required"],
    },
    batch: {
      type: [String],
      required: [true, "Batch is required"],
      enum: {
        values: ["2022-2026", "2023-2027", "2024-2028", "2025-2029"],
        message: "{VALUE} is not a valid batch",
      },
    },
    departments: {
      type: [String],
      required: [true, "At least one department must be selected"],
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

     opportunityLink: {
      type: String,
      required: [true, "Opportunity link is required"],
      // validate: {
      //   validator: function (v) {
      //     return /^(https?:\/\/)/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid URL!`,
      // },
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
