const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    dueDate: String,
    isCompleted: Boolean,
  },
  { versionKey: false } // Disable the version key in the documents
);

// Create a Mongoose model named "photos" using the PhotoSchema
module.exports = mongoose.model("task", TaskSchema);
