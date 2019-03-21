const express = require("express");
const { Thread, threadValidation } = require("../models/thread");
const router = express.Router();
const isLogged = require("../middlewares/isLogged");
const isAdmin = require("../middlewares/isAdmin");

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

router.post("/", [isLogged, isAdmin], async (req, res) => {
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
router.patch("/:id", isLogged, async (req, res) => {
  if (
    !req.body.title ||
    req.body.title.length <= 3 ||
    req.body.title.length >= 255
  ) {
    return res
      .status(400)
      .send({ error: "Title is required and must have between 3- 255 chars" });
  }

  const thread = await Thread.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );
  if (!thread) return res.status(404).send({ error: "Thread not found" });

  res.send(thread);
});
module.exports = router;
