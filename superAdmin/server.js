import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import bodyParser from "body-parser";
import { userRegister } from "./controllers/authController.js";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("welcome to superAdmin with node js");
});
app.post("/register", userRegister);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use(morgan("tiny"));
app.listen(PORT, (req, res) => {
  console.log(`server on run https://localhost: ${PORT}`);
});
