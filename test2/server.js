import express from "express";

const app = express();
const User = {
  id: "232",
  name: "rahul",
  vill: "tiyar",
  Email: "rahul@123",
};

const Port = process.env.port || 3000;

app.get("/", (req, res) => {
  res.send("welcome");
});
app.get("/userInfo", (req, res) => {
  res.send(User);
});

app.listen(Port, (req, res) => {
  console.log(`sever run on http://localhost: ${Port}`);
});
