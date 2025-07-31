// import express from "express";
// import dotenv from "dotenv";
// // import bodyParser from "body-parser";
// import { connectDB } from "./config/db.js";
// import userRouter from "./routers/userRoutes.js";
// import taskRouter from "./routers/taskRoutes.js";
// import projectRouter from "./routers/projectRoutes.js";
// // import { notFound, errorHandeler } from "./middlewares/errorMiddleware.js";
//  import {  errorHandeler } from "./middlewares/errorMiddleware.js";

// dotenv.config();
// const app = express();
// // app.use(express.urlencoded({ extended: true }));
// // app.use(bodyParser.json());

// app.use(express.json());
// connectDB();

// app.get("/", (req, res) => {
//   res.send("welcome to express js by rahul");
// });

// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/project", projectRouter);
// app.use("/api/v1/task", taskRouter);

// // app.use(notFound);
// app.use(errorHandeler);

// const PORT = process.env.PORT || 2000;
// app.listen(PORT, (req, res) => {
//   console.log(`server is run on http://localhost:4000:`);
// });

// import express from "express";
// import dotenv from "dotenv";
// // import bodyParser from "body-parser";
// import { connectDB } from "./config/db.js";
// import userRouter from "./routers/userRoutes.js";
// import taskRouter from "./routers/taskRoutes.js";
// import projectRouter from "./routers/projectRoutes.js";
// // import { notFound, errorHandeler } from "./middlewares/errorMiddleware.js";
// import { errorHandeler } from "./middlewares/errorMiddleware.js";

// dotenv.config();
// const app = express();

// // ✅ Middleware: Body Parsers
// // app.use(express.urlencoded({ extended: true })); // Handle form data
// // app.use(bodyParser.json()); // Handle JSON
// // आप चाहें तो सिर्फ express.json() भी काफ़ी है:
// app.use(express.json());

// connectDB();

// // ✅ Test Route
// app.get("/", (req, res) => {
//   res.send("Welcome to Express JS");
// });

// // ✅ API Routes
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/project", projectRouter);
// app.use("/api/v1/task", taskRouter);

// // ✅ Error Handling Middleware
// // app.use(notFound);
// app.use(errorHandeler);

// // ✅ Server Listen
// const PORT = process.env.PORT || 2000;
// app.listen(PORT, () => {
//   console.log(`✅ Server is running on http://localhost:${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routers/userRoutes.js";
import taskRouter from "./routers/taskRoutes.js";
import projectRouter from "./routers/projectRoutes.js";
import { errorHandeler } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// 🔹 1. JSON Body parsing middleware — MUST be before routes
app.use(express.json()); // ✅ As recommended by Express docs :contentReference[oaicite:1]{index=1}

app.get("/", (req, res) => {
  res.send("Welcome to Express JS by rahul");
});



// 🔹 2. Define routes after body parsing
app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/task", taskRouter);

// 🔹 3. 404 handler — after all valid routes
// app.use(notFound);

// 🔹 4. Global error handler
app.use(errorHandeler);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
