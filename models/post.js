const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2048
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

function postValidation(post) {
  const schema = {
    content: Joi.string()
      .min(2)
      .max(2048)
      .required(),
    authorId: Joi.objectId().required(),
    threadId: Joi.objectId().required()
  };
  return Joi.validate(post, schema);
}

module.exports = {
  Post,
  postValidation
};
