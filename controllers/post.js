const { Post, postValidation } = require("../models/post");
const { User } = require("../models/user");
const { Thread } = require("../models/thread");

const getUserPosts = async (req, res) => {
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
  res.json(posts);
};

const addNewPost = async (req, res) => {
  req.body = { ...req.body, authorId: req.user._id };
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { content, authorId, threadId } = req.body;

  const thread = await Thread.findById(threadId);
  if (!thread) return res.status(400).send({ error: "Thread not found" });

  const post = new Post({ content, author: authorId, thread: threadId });

  await post.save();

  res.status("200").send({
    id: post._id,
    content: post.content
  });
};

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).send("Post with the given ID was not found.");
  }
  if (req.user._id === post._id || req.user.role === "admin") {
    await post.remove();
    res.send(post);
  } else {
    return res.status(403).send("Access denied.");
  }
};

module.exports = {
  getUserPosts,
  addNewPost,
  deletePost
};
