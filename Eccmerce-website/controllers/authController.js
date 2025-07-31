import bcrypt from "bcryptjs";

import { User } from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: false, msg: "All field are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });
    }
    const salt = await bcrypt.genSalt(12);
    const hashpassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashpassword,
      avatar,
    });
    return res.status(201).json({
      success: true,
      msg: "User Registered successfylly",

      user: {
        id: user._id,
        name: user.name,
        email: email.name,
        password: password.name,
        avatar: avatar.name,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "register error", Error: error.message });
  }
};

// Login form

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "All field is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Email and password" });
    }
    const isMatch = await bcrypt.compare(user.password, password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid email and password" });
    }
    return res.status(200).json({
      status: true,
      message: "Login successfull",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return;
  }
};

// get current User Info (my Profile)

export const getuserinfo = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", user });
    }
    res.status(200).json({
      success: true,
      message: "User Login successfull",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "server error", Error: error.message });
  }
};

export const userLogout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", Error: error.message });
  }
};
