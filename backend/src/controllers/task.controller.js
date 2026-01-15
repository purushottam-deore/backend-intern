const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      user: req.user.userId   
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getMyTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.userid });
  res.json(tasks);
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

module.exports = {
  createTask,
  getMyTasks,
  getAllTasks,
  deleteTask
};
