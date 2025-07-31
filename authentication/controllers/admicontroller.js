import User from "../models/userModels.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { _id } = req.params;
  if (!_id) return res.status(400).json({ message: "user id not found" });
  try {
    await User.findByIdAndDelete(_id);
    res.status(200).json({ msg: "user delete successfully" });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};
