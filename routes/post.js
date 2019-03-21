const express = require("express");
const { Post, postValidation } = require("../models/post");
const { Thread } = require("../models/thread");
const router = express.Router();
const isLogged = require("../middlewares/isLogged");

router.post("/", isLogged, async (req, res) => {
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { content, authorId, threadId } = req.body;

  const thread = await Thread.findById(threadId);
  if (!thread) return res.status(400).send({ error: "Thread not found" });

  const post = new Post({ content, author: authorId, thread: threadId });

  await post.save(async err => {
    thread.posts.push(post);
    thread.save();
    return;
  });

  res.status("200").send({
    id: post._id,
    content: post.content
  });
});

router.delete("/:id", [isLogged], async (req, res) => {
  const { author } = await Post.findById(req.params.id).select("author");
  if (req.user._id === author || req.user.role === "admin") {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send("Post with the given ID was not found.");
    }
    res.send(post);
  } else {
    return res.status(403).send("Access denied.");
  }
});
module.exports = router;
