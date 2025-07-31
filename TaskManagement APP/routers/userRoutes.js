import express from "express";
import {
  userRegister,
  userLogin,
  userLogout,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/regiseter", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);

export default userRouter;
