import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import isauthRouter from './router/authRouter.js'

import errorHandler from '/.middlewares/errorHandler.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

app.use(express.json());

app.use("/", (req, res) => {
  res.send("welcome to express js");
});
// Api 

app.use('/api/v1/auth',isauthRouter)
app.use('/api/v1/user',router)
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`server run on the https://localhost: ${PORT}`);
});
