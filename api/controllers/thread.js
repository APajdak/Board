const { Thread } = require("../models/thread");
const { Forum } = require("../models/forum");
const NotFoundError = require("../../errors/NotFoundError");
const BadRequestError = require("../../errors/BadRequestError");
const threadValidation = require("../validation/threadValidation");
const threadUpdateValidation = require("../validation/updateThread");
const ForbiddenError = require("../../errors/ForbiddenError");

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

  res.status("200").json({
    id: thread._id,
    title: thread.title
  });
};

const deleteThread = async (req, res, next) => {
  const thread = await Thread.findById(req.params.id);
  if (!thread) {
    return next(new NotFoundError("Thread with the given ID was not found."));
  }
  if (thread.author == req.user._id || req.user.role === "admin") {
    await thread.remove();
    res.send(thread);
  } else {
    return next(new ForbiddenError("Access denied."));
  }
};

const updateThread = async (req, res, next) => {
  const { author } = await Thread.findById(req.params.id);
  if (author == req.user._id || req.user.role === "admin") {
    const { isValid, errors } = threadUpdateValidation(req.body);
    if (!isValid)
      return next(new BadRequestError("Invalid thread data", errors));

    const thread = await Thread.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );

    res.json(thread);
  } else {
    return next(new ForbiddenError("Access denied."));
  }
};

module.exports = {
  getThreadPosts,
  addNewThread,
  deleteThread,
  updateThread
};
