import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

// const authRouter = express.Router();

// const hasspass = await bcrypt.hash(password, 12);
//     const newUser = await User({
//         name,
//         email,
//         password:hasspass,
//         role
//     });
//     await newUser.save();

//     res.status(200).json({msg:"User Registered successful"})

//   } catch (error) {
//     return res.status(500).josn({msg:"Server error"})
//   }

// this is second method for resister
//  try {
//     const user = await User.create({
//       name,
//       email,
//       password: hash,
//       avatar
//     });

//     res.status(201).json({ msg: "User registered with User.create()", user });
//   } catch (err) {
//     res.status(500).json({ msg: "Error", error: err.message });
//   }

// // below User.create is Thirds methond

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "User already exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hash });

  res.status(201).json({
    msg: "user Register successfuly",
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.status(404).json({ msg: "Not Match the Password" });
    }
    const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"})
    return res.status(200).json({token, msg: "User Login Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};
