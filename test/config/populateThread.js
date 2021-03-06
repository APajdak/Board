const { Thread } = require("../../api/models/thread");

const threadData = {
  title: "Populate Thread"
};

const populateThread = (forumId, authorId) => {
  return new Promise(async (resolve, reject) => {
    const newThread = new Thread({
      ...threadData,
      forum: forumId,
      author: authorId
    });
    try {
      await Thread.deleteMany();
      const thread = await newThread.save();
      return resolve({ threadId: thread._id, slug: thread.slug });
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = { populateThread, threadData };
