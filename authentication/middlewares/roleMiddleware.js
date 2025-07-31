// const roleMiddleware = (role) => (req, res, next) => {
//   if (req.userRole !== role) {
//     return res.status(403).json({ msg: "Access denied: Insufficient role" });
//   }
//   next();
// };

// export default roleMiddleware;


const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (req.userRole !== requiredRole) {
    return res.status(403).json({ msg: 'Access denied: Insufficient role gi' });
  }
  next();
};

export default roleMiddleware;