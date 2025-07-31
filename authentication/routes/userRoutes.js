import express from "express";
import { getProfile } from "../controllers/usercontroller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile",authMiddleware, getProfile);

export default router;
