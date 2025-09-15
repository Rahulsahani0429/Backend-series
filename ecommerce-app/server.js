import express from "express";
import cors from "cors";
import morgan from "morgan";

import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("welcome to express js");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server run on http://localhost:${PORT}`);
});
