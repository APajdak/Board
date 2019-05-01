const { Forum } = require("../../api/models/forum");

const forumData = {
  name: "Populate forum"
};

const populateForum = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await Forum.deleteMany();
      const newForum = new Forum(forumData);
      const forum = await newForum.save();
      return resolve({ forumId: forum._id });
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = { populateForum, forumData };
