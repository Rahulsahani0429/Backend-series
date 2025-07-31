import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.get("/", (req, res) => {
  res.send("welcome to express js by rahul kumar");
});

app.listen(PORT, () => {
  console.log(`server  run  on http://localhost:${PORT}`);
});
