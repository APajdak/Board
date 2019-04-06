const mongoose = require("mongoose");
const Joi = require("joi");
const generateSlug = require("../utils/generateSlug");

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
  slug: {
    type: String,
    required: false
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Post"
    }
  ]
});

threadSchema.pre("save", function(next) {
  const thread = this;
  thread.slug = generateSlug(thread.title);
  next();
});

threadSchema.pre("remove", function(next) {
  const thread = this;
  thread.model("Post").find(
    {
      thread: thread._id
    },
    (err, posts) => {
      if (err) {
        return next(err);
      }
      for (var post in posts) {
        posts[post].remove();
      }
    }
  );
  next();
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
