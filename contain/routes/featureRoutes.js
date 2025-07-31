import express from "express";
import {
  createFeature,
  getFeatures,
  updateFeature,
  deleteFeature,
} from "../controllers/featureController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createFeature);
router.get("/", protect, getFeatures);
router.put("/:id", protect, updateFeature);
router.delete("/:id", protect, deleteFeature);

export default router;
