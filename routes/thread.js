const express = require("express");
const { Thread, threadValidation } = require("../models/thread");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const thread = await Thread.findById(req.params.id).populate({
    path: "posts",
    select: "-thread",
    populate: {
      path: "author",
      select: "-password -registeredAt"
    }
  });
  if (!thread) return res.status(404).send("Thread not found");
  res.send(thread);
});

router.post("/", async (req, res) => {
  const { error } = threadValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, authorId } = req.body;
  const thread = new Thread({ title, author: authorId });

  await thread.save();

  res.status("200").send({
    id: thread._id,
    title: thread.title
  });
});
module.exports = router;
