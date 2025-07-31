import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import contaceRouter from "./routers/contactRouters.js";

import cors from "cors";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/home", (req, res) => {
  res.send("📒 Contact Book API is running...");
});
// app.use("api/contactss",contaceRouter)
app.use("/api/contacts", contaceRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
