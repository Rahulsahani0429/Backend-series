import express from "express";

import { getAllUsers, deleteUser } from "../controllers/admicontroller.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const adminRoute = express.Router();

adminRoute.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers);



adminRoute.get(
  "/delete/:_id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);
export default adminRoute;
