const express = require("express");
const bcrypt = require("bcrypt");
const { Thread } = require("../models/thread");
const { Post } = require("../models/post");
const { User } = require("../models/thread");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi");
});

router.post("/", async (req, res) => {
  //   const { error } = validate(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  const { content, author, thread } = req.body;
  const post = new Post({ content, author, thread });

  await post.save();

  res.status("200").send({
    id: post._id,
    content: post.content
  });
});
module.exports = router;
