const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
let app = express();

mongoose.connect(keys.MONGODB_URL, { useNewUrlParser: true }).then(() => {
  console.log("Connected to DB");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
