import User from "../models/userModels.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json({ mgs: "user find", user });
  } catch (error) {
    res.status(500).json({ msg: "server error gi" });
  }
};

