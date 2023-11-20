const express = require("express");
const taskBL = require("../BLL/taskBL");

const router = express.Router();

router.get("/", async function (req, resp) {
  try {
    let tasks = await taskBL.getTasks();
    return resp.json(tasks);
  } catch (error) {
    return resp.status(500).json({ error: error.message });
  }
});

router.get("/:id", async function (req, resp) {
  try {
    let id = req.params.id;
    let task = await taskBL.getTask(id);
    if (!task) {
      return resp.status(404).json({ error: "Task not found" });
    }
    return resp.json(task);
  } catch (error) {
    return resp.status(500).json({ error: error.message });
  }
});

router.post("/", async function (req, resp) {
  try {
    let obj = req.body;
    let taskId = await taskBL.addTask(obj);
    return resp.status(201).json({ _id: taskId });
  } catch (error) {
    return resp.status(500).json({ error: error.message });
  }
});

router.put("/:id", async function (req, resp) {
  try {
    let id = req.params.id;
    let obj = req.body;
    let status = await taskBL.updateTask(id, obj);
    if (status === "Updated succeeded") {
      return resp.json({ message: status });
    } else {
      return resp.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    return resp.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async function (req, resp) {
  try {
    let id = req.params.id;
    let status = await taskBL.deleteTask(id);
    if (status === "Deleted succeeded") {
      return resp.json({ message: status });
    } else {
      return resp.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    return resp.status(500).json({ error: error.message });
  }
});

module.exports = router;
