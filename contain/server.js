import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import featureRoutes from "./routes/featureRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Body parser

app.get("/home", (req, res) => {
  res.send("welcome to express js");
});

app.use("/api/users", userRoutes);
app.use("/api/features", featureRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
