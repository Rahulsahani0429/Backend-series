import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// register router

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const myuser = await User.findOne({ email });
    if (myuser) {
      return res.status(400).json({ msg: "user already exists" });
    }

    // password hash

    const hashpass = await bcrypt.hash(password, 2);

    const newUser = new User({
      name,
      email,
      password: hashpass,
    });

    await newUser.save();
    return res.status(200).json({ msg: "User register successfully" });
  } catch (error) {
    res.status(500).json({ msg: "server Error" });
  }
});

// login route

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user1 = await User.findOne({ email });
    if (!user1) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user1.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credential" });
    }

    const token = jwt.sign({ userId: user1._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token }); // if we want to show the token as a login then we will use this line
    // res.status(200).json({ msg: "login successful" }); //if we want to show some message then we use this line
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
});
// use info

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user1 = await User.findById(req.userId).select("-password");
    res.status(200).json(user1);
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
});
router.put("/userinfo", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user1 = await User.findById(req.userId);
    if (!user1) {
      return res.status(400).json({ msg: "user not found" });
    }
    if (name) user1.name = name;
    if (email) user1.email = email;
    await user1.save();
    return res.status(200).json({ msg: "user update sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "server Error" });
  }
});
router.post('/logout',(req,res)=>{
  return res.status(200).json({msg:"logout successful"})

})
export default router;
