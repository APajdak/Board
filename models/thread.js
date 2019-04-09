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
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "User"
  },
  forum: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Forum"
  },
  slug: {
    type: String,
    trim: true,
    required: false
  },
  latestUpdate: {
    date: {
      type: Date,
      required: false
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Post"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User"
    }
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
  thread
    .model("Forum")
    .updateOne({ _id: thread.forum }, { $push: { threads: thread._id } }, next);
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
      for (let post in posts) {
        posts[post].remove();
      }
    }
  );
  thread
    .model("Forum")
    .update(
      { threads: thread._id },
      { $pull: { threads: { $in: [thread._id] } } },
      next
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
    authorId: Joi.objectId().required(),
    forumId: Joi.objectId().required()
  };
  return Joi.validate(thread, schema);
}

module.exports = {
  Thread,
  threadValidation
};
