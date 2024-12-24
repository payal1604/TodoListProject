const express = require("express");
const {
  getAllTasks,
  addNewTask,
  updateTask,
  deleteTask,
  sendReminder,
  getAllStatusPending
} = require("../Controller/taskController");
const taskRouter = express.Router();
taskRouter.get("/tasks", getAllTasks);
taskRouter.post("/tasks", addNewTask);
taskRouter.put("/tasks/:id", updateTask);
taskRouter.delete("/tasks/:id", deleteTask);
taskRouter.post("/tasks/:id/reminder", sendReminder);
taskRouter.get("/tasks/status",getAllStatusPending);

module.exports = taskRouter;
