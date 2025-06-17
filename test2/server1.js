import express from "express";

const app = express();
const StateInfo = [
  {
    NO: 1,
    dist: "siwan",
    state: "Bihar",
  },
  {
    NO: 2,
    dist: "chhapra",
    state: "new Bihar",
  },
];

const Port = process.env.port || 3000;

app.get("/", (req, res) => {
  res.send("welcome");
});
app.get("/info", (req, res) => {
  //   res.json(StateInfo);
  res.send(StateInfo);
});

app.listen(Port, (req, res) => {
  console.log(`sever run on http://localhost: ${Port}`);
});
