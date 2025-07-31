import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/authRouters.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to express js");
});

app.use("/api/auth", router);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
