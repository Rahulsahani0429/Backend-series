import express from "express";
import {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authrizeRole } from "../middlewares/roleMiddleware.js";

const projectRouter = express.Router();

projectRouter.post(
  "/create",
  protect,
  authrizeRole("admin", "manager"),
  createProject
);
projectRouter.get("/getallproject", protect, getAllProject);
projectRouter.get("/:id", protect, getProjectById);
projectRouter.put(
  "/:id",
  protect,
  authrizeRole("admin", "manager"),
  updateProject
);
projectRouter.delete("/:id", protect, authrizeRole("admin"), deleteProject);

export default projectRouter;
