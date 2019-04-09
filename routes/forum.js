const express = require("express");

const router = express.Router();
const { Forum, forumValidation } = require("../models/forum");

router.get("/:slug", async (req, res) => {
  const forum = await Forum.findOne({ slug: req.params.slug })
    .select("_id")
    .populate({
      path: "threads",
      select: "title author createdAt latestUpdate -_id",
      options: {
        sort: {
          latestUpdate: -1
        }
      },
      populate: {
        path: "author",
        select: "role name -_id"
      },
      populate: {
        path: "latestUpdate.user",
        select: "name slug -_id"
      }
    });
  res.send(forum);
});

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
