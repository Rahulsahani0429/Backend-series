const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/user.models");
const bodyParser = require ("body-parser")

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "mysecret", resave: false, saveUninitialized: true })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB connected"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});
app.post("/register",async (req,res)=>{
  const {email,password} =req.body
  try {
    await User.create({
      email,password
    })
    res.status(201).json({status:true,message:"User created successfully"})
  } catch (error) {
    res.status(500).json({status:false,message:error.message})
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Invalid credentials");

  req.session.userId = user._id;
  res.send("Login successful");
});

// Dummy route after login
app.get("/dashboard", (req, res) => {
  if (!req.session.userId) return res.redirect("/");
  res.send("Welcome to your dashboard!");
});

// Start server
app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
