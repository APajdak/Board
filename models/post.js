const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post"
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
  validate: validatePost
};
