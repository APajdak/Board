const mongoose = require("mongoose");
const { MONGODB_URL } = require("./keys");

const options = {
  useNewUrlParser: true,
  bufferCommands: false
};

mongoose
  .connect(MONGODB_URL, options)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log("Could not connect to DB"));
mongoose.set("useCreateIndex", true);
