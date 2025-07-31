import express from "express";

import {
  createNode,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import { protect } from "../middlewares/authMiddleware.js";

const noteRouter = express.Router();

noteRouter.post("/", protect, createNode);
noteRouter.get("/", protect, getNotes);
noteRouter.put("/:id", protect, updateNote);
noteRouter.delete("/:id", protect, deleteNote);

export default noteRouter;
