const { Forum } = require("../models/forum");
const BadRequestError = require("../../errors/BadRequestError");
const NotFoundError = require("../../errors/NotFoundError");
const forumValidation = require("../validation/forumValidation");

const getForums = async (req, res, next) => {
  const forums = await Forum.find().select("name slug -_id");
  if (!forums) return next(new NotFoundError("Forums not found"));
  res.send(forums);
};

const getForumThreads = async (req, res, next) => {
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
  if (!forum) return next(new NotFoundError("Forum not found"));
  res.send(forum);
};

const addNewForum = async (req, res, next) => {
  const { isValid, errors } = forumValidation(req.body);
  if (!isValid) return next(new BadRequestError("Invalid data", errors));

  const forum = new Forum({ name: req.body.name, category: req.body.category });
  await forum.save();

  res.status("200").send({
    id: forum._id,
    name: forum.name
  });
};

const updateForum = async (req, res, next) => {};

module.exports = {
  getForumThreads,
  addNewForum,
  getForums
};
