export const errorHandler = (err, req, req, next) => {
  const statusCode = req.statusCode === 200 ? 500 : req.statusCode;
  res.status(statusCode).json({
    msg: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
