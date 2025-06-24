const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure directory exists or create it
const resumePath = path.join(__dirname, "../uploads/resumes");
if (!fs.existsSync(resumePath)) {
  fs.mkdirSync(resumePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resumePath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
