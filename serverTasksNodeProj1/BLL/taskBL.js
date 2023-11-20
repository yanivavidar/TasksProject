const Task = require("../Models/TaskModel");

const getTasks = () => {
  return Task.find({});
};

const getTask = (id) => {
  return Task.findById(id);
};

const addTask = async (NewT) => {
  const task = new Task(NewT);
  await task.save();
  return task._id;
};

const updateTask = async (id, task) => {
  await Task.findByIdAndUpdate(id, task);
  return "Updated succeeded";
};

const deleteTask = async (id) => {
  await Task.findByIdAndDelete(id);
  return "Deleted succeeded";
};

module.exports = { getTasks, getTask, addTask, updateTask, deleteTask };
