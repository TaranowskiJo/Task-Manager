const express = require("express");
// connect these to server task.controller
//back end
const {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
} = require("../controllers/task.controller");

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
// data at the :id spot in url is accessed with req.params.id.
// route params can be named anything and the name will be added to req.params.
router.get("/:id", getTaskById);
router.delete("/:id", deleteTaskById);
router.put("/:id", updateTaskById);

module.exports = { taskRouter: router };
