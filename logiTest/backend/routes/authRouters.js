import express from "express";
import { loginUser, getMyProfile } from "../controllers/authController.js";
import { protect } from "../middlewares/protect.js";
import { register } from "../../../authentication/controllers/authcontroller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/me", protect, getMyProfile);

export default router;
