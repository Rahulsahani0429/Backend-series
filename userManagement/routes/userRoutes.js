import express from "express";
import {
  userDetail,
  updateUserByAdmin,
  deleteUserByAdmin,
  updateOwnProfile,
} from "../controllers/userCotroller.js";

import protect from "../middlewares/authMiddleware.js";

import isAdmin from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, userCotroller);
router.put("/alluser/:id", protect, isAdmin, updateUserByAdmin);

router.delete("/user/:id", protect, isAdmin, deleteUserByAdmin);

router.put("/update", protect, updateOwnProfile);

export default router;
