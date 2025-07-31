// // Invalid Router Handler

// export const notFound = (req, res, next) => {
//   const error = new Error(`Not Found ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// // Global Error Handler

// export const errorHandeler = (error, req, res, next) => {
//   console.log(error.message);
//   const statusCode = req.statusCode === 200 ? 500 : req.statusCode;
//   return res.status(statusCode).json({
//     message: error.message,
//     stack: process.env.MODE_ENV === "production" ? null : error.stack,
//   });
// };

// 1. Not Found Middleware
// export const notFound = (req, res, next) => {
//   const error = new Error(`Not Found ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// // 2. Error Handler Middleware
// export const errorHandeler = (error, req, res, next) => {
//   console.log(error.message);
//   const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

//   res.status(statusCode).json({
//     message: error.message,
//     stack: process.env.NODE_ENV === "production" ? null : error.stack,
//   });
// };

export const errorHandeler = (error, req, res, next) => {
  console.log("Error", error.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    msg: "Sever error" || error.message,
    stack: process.env.NODE_ENV ? null : error.stack,
  });
};
