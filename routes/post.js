const express = require("express");
const { Post, postValidation } = require("../models/post");
const { Thread } = require("../models/thread");
const router = express.Router();
const checkToken = require("../middlewares/isLogged");

router.get("/", (req, res) => {
  res.send("hi");
});

router.post("/", checkToken, async (req, res) => {
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
module.exports = router;
