import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
// user all users details
export const userDetail = async (res, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({ users, msg: "user found successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "user not found" });
  }
};

// update the users details by Admin

export const updateUserByAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }

    user.name = req.boby.name || user.name;
    user.role = req.body.role || user.role;
    user.status = req.body.status || user.status;

    await user.save();
    return req.status(200).json({ msg: "user updated", user });
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
};

// delete user by admin

export const deleteUserByAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "server Error" });
  }
};

// update Own profile {name, avatar, email, password, etc}

export const updateOwnProfile = async (req, res) => {
  const {id}  = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.role = req.boby.role || user.role;
    user.avatar = req.boby.avatar || user.avatar;
    user.email = req.boby.email || user.email;
    user.avatar = req.boby.password || user.password;
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};
