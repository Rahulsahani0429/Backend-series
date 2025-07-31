export const errorMiddleware = (error, req, res, next) => {
  console.log("Error", error.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res
    .status(statusCode)
    .json({
      msg: "Sever error" || error.message,
      stack: process.env.NODE_ENV ? null : error.stack,
    });
};
