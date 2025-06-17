import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
// const PORT =4000

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

//  const MONGO_URL='mongodb://localhost:27017'
mongoose
  .connect(MONGO_URL, {})
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch((error) => {
    console.log("something is wrong with database");
  });
 


const myInfo = {
  name: "rahul sahani",
  Reg_no: 310521104051,
  
};

const jokes = [
  {
    "id": 1,
    "question": "Why don't scientists trust atoms?",
    "answer": "Because they make up everything!"
  },
  {
    "id": 2,
    "question": "Why did the math book look sad?",
    "answer": "Because it had too many problems."
  },
  {
    "id": 3,
    "question": "Why don't programmers like nature?",
    "answer": "It has too many bugs."
  },
  {
    "id": 4,
    "question": "What do you call fake spaghetti?",
    "answer": "An impasta!"
  },
  {
    "id": 5,
    "question": "Why was the JavaScript developer sad?",
    "answer": "Because he didn’t 'null' his feelings."
  }
]

  

// route
app.get("/", (req, res) => {
  res.send("welcome to express js with mongoDB");
  console.log("welcome to express js");
});

app.get("/mycollegeInfo", (req, res) => {
  res.send(myInfo);
});
app.get("/api/myJokes", (req, res) => {
  res.send(jokes);
});

app.listen(PORT, (req, res) => {
  console.log(`server run on http://localhost:${PORT}`);
});
