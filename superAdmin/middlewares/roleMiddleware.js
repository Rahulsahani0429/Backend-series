// export const authorizeRole = (role) => {
//   return (req, res, next) => {
//     if (role !== req.user.role) {
//       return res.status(404).json({ msg: "Access Denied: Insufficient role gi" });
//     }
//     next();
//   };
// };

// Second method

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    !roles.includes(req.user.role);
    return res
      .status(404)
      .json({
        msg: `Role (${req.user.role}) not allowed to access this resource`,
      });
  };
};

// export const authorizeRole = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({
//         msg: `Access Denied: Role '${req.user.role}' is not allowed`,
//         allowed: allowedRoles,
//       });
//     }
//     next();
//   };
// };
