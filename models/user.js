const mongoose = require("mongoose");

const User = new mongoose.Schema({
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
    minlength: 6,
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
