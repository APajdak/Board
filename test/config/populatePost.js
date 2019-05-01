const { Post } = require("../../api/models/post");

const postData = {
  content: "Testing posts"
};

const populatePost = (authorId, threadId) => {
  return new Promise(async (resolve, reject) => {
    const newPost = new Post({
      ...postData,
      author: authorId,
      thread: threadId
    });
    try {
      await Post.deleteMany();
      const post = await newPost.save();
      return resolve(post);
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = { populatePost, postData };
