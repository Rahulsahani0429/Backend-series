// // // import mongoose from 'mongoose'
// // // import dotenv from 'dotenv'
// // // dotenv.config();

// // // const MONGO_URL = process.env.MONGO_URL
// // // mongoose.connect(MONGO_URL, {

// // // })
// // // .then(() =>{
// // //     console.log("mongoDB connected");
// // // }).catch((err) => {
// // //     console.log("DB connection Error");
// // // })

// // import mongoose from "mongoose";
// // import dotenv from "dotenv";
// // dotenv.config();

// // const MONGO_URL = process.env.MONGO_URL;

// // if (!MONGO_URL) {
// //   console.error("❌ MONGO_URL is not defined in .env file");
// //   process.exit(1); // stop the app if no URL
// // }

// // mongoose
// //   .connect(MONGO_URL, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => {
// //     console.log("✅ MongoDB connected");
// //   })
// //   .catch((err) => {
// //     console.error("❌ DB connection Error:", err.message);
// //   });

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = 6000;

// const MONGO_URL = process.env.MONGO_URL;

// // Connect to MongoDB
// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("✅ MongoDB connected successfully");
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err.message);
//   });

// // Start Express server
// app.listen(PORT, () => {
//   console.log(`🚀 Express server running on http://localhost:${PORT}`);
// });
