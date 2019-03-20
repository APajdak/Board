const express = require("express");
const { Thread, threadValidation } = require("../models/thread");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi");
});

router.post("/", async (req, res) => {
  const { error } = threadValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, authorId } = req.body;
  const thread = new Thread({ title, authorId });

  await thread.save();

  res.status("200").send({
    id: thread._id,
    title: thread.title
  });
});
module.exports = router;
