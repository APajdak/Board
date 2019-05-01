const { Post } = require("./../models/post");
const { User } = require("./../models/user");
const { Thread } = require("./../models/thread");
const NotFoundError = require("../../errors/NotFoundError");
const BadRequestError = require("../../errors/BadRequestError");
const ForbiddenError = require("../../errors/ForbiddenError");
const postValidation = require("../validation/postValidation");
const postUpdateValidation = require("../validation/updatePost");

const getUserPosts = async (req, res, next) => {
  const posts = await User.findOne({ slug: req.params.slug })
    .select("posts")
    .populate({
      path: "posts",
      select: "-author",
      populate: {
        path: "thread",
        select: "title"
      }
    });
  if (!posts) return next(new BadRequestError("Posts not found"));
  res.json(posts);
};

const addNewPost = async (req, res, next) => {
  req.body = { ...req.body, authorId: req.user._id };
  const { isValid, errors } = postValidation(req.body);
  if (!isValid) return next(new BadRequestError("Invalid post data", errors));

  const { content, authorId, threadId } = req.body;

  const thread = await Thread.findById(threadId);
  if (!thread) return next(new BadRequestError("Thread not found"));

  const post = new Post({ content, author: authorId, thread: threadId });

  await post.save();

  res.status("200").send({
    id: post._id,
    content: post.content
  });
};

const deletePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new NotFoundError("Post with the given ID was not found."));
  }

  if (req.user._id == post.author || req.user.role === "admin") {
    await post.remove();
    res.send(post);
  } else {
    return next(new ForbiddenError("Access denied."));
  }
};

const updatePost = async (req, res, next) => {
  const { author } = await Post.findById(req.params.id);
  if (author == req.user._id || req.user.role === "admin") {
    const { isValid, errors } = postUpdateValidation(req.body);
    if (!isValid) return next(new BadRequestError("Invalid post data", errors));

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );
    res.json(post);
  } else {
    return next(new ForbiddenError("Access denied."));
  }
};

module.exports = {
  getUserPosts,
  addNewPost,
  deletePost,
  updatePost
};
