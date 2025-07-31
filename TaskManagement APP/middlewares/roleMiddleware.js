// export const authRole = (...rolesAllows) => {
//   return (req, res, next) => {
//     if (!rolesAllows.includes(req.user.role)) {
//       return res.status(404).json({
//         msg: `Access not Denie (${req.user.role})`,
//         rolesAllows: rolesAllows,
//       });
//     }
//     next();
//   };
// };

// this is second method

export const authrizeRole = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role)
      return res.status(404).json({ msg: "Access Denie , no Token kkk" });
    next();
  };
};

// export const authrizeRole = (requiredRole) => {
//   return (req, res, next) => {
//     try {
//       // Check if user role matches required role
//       if (req.user.role !== requiredRole) {
//         return res
//           .status(403)
//           .json({ msg: "Access Denied: You are not authorized" });
//       }
//       next();
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ msg: "Server Error", error: error.message });
//     }
//   };
// };
