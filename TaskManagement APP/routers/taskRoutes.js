import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authrizeRole } from "../middlewares/roleMiddleware.js";

const taskRouter = express.Router();

taskRouter.post(
  "/createtask",
  protect,
  authrizeRole("admin", "manager"),
  createTask
);
taskRouter.get("/getalltask", protect, getAllTasks);
taskRouter.get("/:id", protect, getTaskById);
taskRouter.put(
  "/update/:id",
  protect,
  authrizeRole("admin", "manager"),
  updateTask
);
taskRouter.delete("/:id", protect, authrizeRole("admin"), deleteTask);

export default taskRouter;
