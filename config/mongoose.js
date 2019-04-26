const mongoose = require("mongoose");
const { MONGODB_URL } = require("./keys");

const options = {
  useNewUrlParser: true,
  bufferCommands: false
};

mongoose.connect(MONGODB_URL, options, err => {
  if (err) {
    return console.log("Could not connect to DB");
  }
  return console.log("Connected to DB");
});
mongoose.set("useCreateIndex", true);
