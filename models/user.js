const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300
  },
  registered: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: "user"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User
};
