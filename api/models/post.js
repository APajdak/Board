const mongoose = require("mongoose");
const ApplicationError = require("../../errors/ApplicationError");

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
        postId: post._id,
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

postSchema.post("remove", function(next) {
  this.model("Thread")
    .findOne({ _id: this.thread })
    .exec(async (err, thread) => {
      if (err) return next(new ApplicationError());
      if (!thread) return next;
      if (this._id.equals(thread.latestUpdate.postId)) {
        try {
          const newPost = await this.model("Post").findOne({
            _id: thread.posts[thread.posts.length - 1]
          });
          thread.latestUpdate.postId = newPost ? newPost._id : null;
          thread.latestUpdate.date = newPost ? newPost.createdAt : null;
          thread.latestUpdate.user = newPost ? newPost.author : null;
          thread.save();
        } catch (ex) {
          return next(new ApplicationError());
        }
      }
    });

  next;
});
const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post
};
