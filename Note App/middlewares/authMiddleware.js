import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(404).json({ msg: "Access Denied. No token" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();

  } catch (error) {
    return res.status(401).json({ msg: "Invalid token", Error: error.message });
  }
};


