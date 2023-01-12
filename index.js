const express = require("express");
const jose = require("jose");
express.json();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("good");
});

app.listen(port, () => {
  console.log("run");
});
