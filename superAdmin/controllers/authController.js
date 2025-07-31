import bcrypt from "bcryptjs";

import { User } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
export const userRegister = async (req, res) => {
  try {
    const { name, email, password, role, age, joiningDate } = req.body;
    // console.log("this my name", email);
    const AllowRoles = ["manager", "admin", "worker"];
    if (!AllowRoles.includes(role?.toLowerCase())) {
      return res
        .status(400)
        .json({ msg: "Role must be admin,manager or worker", status: false });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "User already exist" });
    }

    const genSalt = await bcrypt.genSalt(12);
    const passhash = await bcrypt.hash(password, genSalt);
    const newUser = new User({
      name,
      email,
      password: passhash,
      role,
      age,
      joiningDate:new Date(joiningDate).toDateString(),
      createdBy: req.user?._id || null,
    });
    await newUser.save();
    res.status(200).json({
      msg: "User registered successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({ msg: error, status: false });
  }
};

// login

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "user not fonund" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ msg: "password not match" });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      status: true,
      msg: "Login success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "server error", error: error.message });
  }
};
