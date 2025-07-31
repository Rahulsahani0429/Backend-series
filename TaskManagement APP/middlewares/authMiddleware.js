import jwt from "jsonwebtoken";

import { User } from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(404).json({ msg: "Access Denied. No token gi" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(404).json({ msg: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", Error: error.message });
  }
};

// import jwt from "jsonwebtoken";

// import { User } from "../models/userModel.js";

// export const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     // ✅ Check if token exists
//     if (!token) {
//       return res.status(401).json({ msg: "Access Denied. No token provided" });
//     }

//     // ✅ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // ✅ Find user by decoded id
//     req.user = await User.findById(decoded.id).select("-password");

//     // ✅ Check if user exists
//     if (!req.user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     // ✅ Continue to next middleware or controller
//     next();
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ msg: "Invalid or expired token", error: error.message });
//   }
// };
