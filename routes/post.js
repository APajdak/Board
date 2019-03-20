const express = require("express");
const { Post, postValidation } = require("../models/post");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi");
});

router.post("/", async (req, res) => {
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { content, author, thread } = req.body;
  const post = new Post({ content, author, thread });

  await post.save();

  res.status("200").send({
    id: post._id,
    content: post.content
  });
});
module.exports = router;
