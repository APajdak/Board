const { Thread, threadValidation } = require("../models/thread");
const { Forum } = require("../models/forum");

const getThreadPosts = async (req, res) => {
  const thread = await Thread.findOne({ slug: req.params.slug }).populate({
    path: "posts",
    select: "-thread",
    populate: {
      path: "author",
      select: "-password -registeredAt"
    }
  });
  if (!thread) return res.status(404).send("Thread not found");
  res.send(thread);
};

const addNewThread = async (req, res) => {
  req.body = { ...req.body, authorId: req.user._id };
  const { error } = threadValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, authorId, forumId } = req.body;

  const forum = await Forum.findById(forumId);
  if (!forum) return res.status(400).send({ error: "Forum not found" });

  const thread = new Thread({ title, author: authorId, forum: forumId });

  await thread.save();

  res.status("200").send({
    id: thread._id,
    title: thread.title
  });
};

const deleteThread = async (req, res) => {
  const thread = await Thread.findById(req.params.id);
  if (!thread) {
    return res.status(404).send("Thread with the given ID was not found.");
  }
  await thread.remove();
  res.send(thread);
};

const updateThread = async (req, res) => {
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
};

module.exports = {
  getThreadPosts,
  addNewThread,
  deleteThread,
  updateThread
};
