import { generateToken } from "../utils/generateToken.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
export const userRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // console.log("register", req.body);
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ msg: "User already exist" });
    const salt = await bcrypt.genSalt(12);

    const hashpass = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashpass,
      role,
    });
    return res.status(201).json({
      msg: "User Registered",
      token: generateToken(user._id),
      status: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // console.log(error.message);
    return res
      .status(500)
      .json({ msg: "server Error gi", status: false, Error: error.message });
  }
};

// Login controller

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: "Invalid eamil and password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(404).json({ msg: "Invalid email or password" });
    return res.status(200).json({
      status: true,
      msg: "Login successfull",
      token: generateToken(user._id),
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "server Error", Error: error.message });
  }
};

//Logout

export const userLogout = (req, res) => {
  return res
    .status(200)
    .json({ status: true, msg: "Logout successfully", token: null });
};
