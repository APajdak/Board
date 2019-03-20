const express = require("express");
const bcrypt = require("bcrypt");
const { Thread } = require("../models/thread");
const { User } = require("../models/thread");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi");
});

router.post("/", async (req, res) => {
  //   const { error } = validate(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  const { title, author } = req.body;
  const thread = new Thread({ title, author });

  await thread.save();

  res.status("200").send({
    id: thread._id,
    name: thread.title,
    email: thread.author
  });
});
module.exports = router;
