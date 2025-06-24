const mongoose = require("mongoose");
const { ATLAS_URL } = require("./serverConfig");

async function connectToDB() {
  try {
    await mongoose.connect(ATLAS_URL, {
      family: 4, // Optional: forces IPv4 if needed
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Unable to connect to MongoDB:", error.message);
    throw error; // You had a typo: 'error' not defined, it should be 'throw error'
  }
}

module.exports = connectToDB;
