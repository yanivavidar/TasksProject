const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/tasksDB");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = connectDB;
