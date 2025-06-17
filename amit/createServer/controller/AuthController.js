const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {
  login: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: errors.errors[0].msg,
      });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ status: false, message: "Credensial not matched" });

      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ status: true, message: "login", token });
    } catch (error) {
      console.error(error);
    }
  },
  register: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: errors.errors[0].msg,
      });
    }
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ status: false, message: "Email already exist" });
      const salt = await bcrypt.genSalt(12);
      const haspassword = await bcrypt.hash(password, salt);
      await User.create({
        name,
        email,
        password: haspassword,
      });
      return res
        .status(201)
        .json({ status: true, message: "User resgister successfully" });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = AuthController;
