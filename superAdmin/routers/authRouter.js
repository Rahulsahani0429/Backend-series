import { Router } from "express";
import { userRegister, userLogin } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);

export default authRouter;
