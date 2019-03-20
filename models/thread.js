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

function threadValidation(thread) {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(255)
      .required(),
    authorId: Joi.objectId().required()
  };
  return Joi.validate(thread, schema);
}

module.exports = {
  Thread,
  threadValidation
};
