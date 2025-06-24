const mongoose = require("mongoose");
const Admin = require("../models/adminModel");

async function main() {
  await mongoose.connect(
    "mongodb+srv://vivekpundir33:TyYglTEOKQ08EkK0@cluster0.6tgojko.mongodb.net/"
  );

  try {
    await Admin.create({
      email: "yashpreet@gmail.com",
      password: "Abcd@1234", // plain password, should be hashed in pre-save hook
      role: "superadmin",
    });

    console.log("✅ Superadmin created");
  } catch (error) {
    console.error("❌ Error creating superadmin:", error.message);
  } finally {
    mongoose.disconnect();
  }
}

main();
