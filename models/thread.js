const mongoose = require("mongoose");
const Joi = require("joi");

const threadSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Post"
    }
  ]
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = {
  Thread
};
