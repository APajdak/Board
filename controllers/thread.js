const { Thread } = require("../models/thread");
const { Forum } = require("../models/forum");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const threadValidation = require("../validation/threadValidation");

const getThreadPosts = async (req, res, next) => {
  const thread = await Thread.findOne({ slug: req.params.slug }).populate({
    path: "posts",
    select: "-thread",
    populate: {
      path: "author",
      select: "-password -registeredAt"
    }
  });
  if (!thread) return next(new NotFoundError("Thread not found"));
  res.send(thread);
};

const addNewThread = async (req, res, next) => {
  req.body = { ...req.body, authorId: req.user._id };

  const { isValid, errors } = threadValidation(req.body);
  if (!isValid) return next(new BadRequestError("Invalid thread data", errors));

  const { title, authorId, forumId } = req.body;

  const forum = await Forum.findById(forumId);
  if (!forum) return next(new BadRequestError("Forum not found"));

  const thread = new Thread({ title, author: authorId, forum: forumId });

  await thread.save();

  res.status("200").send({
    id: thread._id,
    title: thread.title
  });
};

const deleteThread = async (req, res, next) => {
  const thread = await Thread.findById(req.params.id);
  if (!thread) {
    return next(new NotFoundError("Thread with the given ID was not found."));
  }
  await thread.remove();
  res.send(thread);
};

const updateThread = async (req, res, next) => {
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
  if (!thread) return next(new NotFoundError("Thread not found"));

  res.json(thread);
};

module.exports = {
  getThreadPosts,
  addNewThread,
  deleteThread,
  updateThread
};
