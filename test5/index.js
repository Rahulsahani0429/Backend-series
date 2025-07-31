import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js" 

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());

mongoose
  .connect(MONGO_URL, {})
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("something wrong with mongoDB");
  });

  app.use("/api",authRoute);

app.get("/", (req, res) => {
  res.send("welcome to express js");
});

app.listen(PORT, (req, res) => {
  console.log(`server running on ${PORT}`);
});
