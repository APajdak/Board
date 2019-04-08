const express = require("express");
const router = express.Router();
const { Forum, forumValidation } = require("../models/forum");

router.get("/:slug", async (req, res) => {});

router.post("/", async (req, res) => {
  const { error } = forumValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const forum = new Forum({ name: req.body.name });
  await forum.save();

  res.status("200").send({
    id: forum._id,
    name: forum.name
  });
});

module.exports = router;
