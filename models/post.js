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
    ref: "Thread"
  }
});

postSchema.pre("save", function(next) {
  const post = this;
  post.model("Thread").updateOne(
    { _id: post.thread },
    {
      latestUpdate: {
        date: Date.now(),
        user: post.author
      },
      $push: { posts: post._id }
    },
    next
  );
  post
    .model("User")
    .updateOne({ _id: post.author }, { $push: { posts: post._id } }, next);
});

postSchema.pre("remove", function(next) {
  this.model("Thread").updateOne(
    { posts: this._id },
    { $pull: { posts: { $in: [this._id] } } },
    next
  );
  this.model("User").updateOne(
    { posts: this._id },
    { $pull: { posts: { $in: [this._id] } } },
    next
  );
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
