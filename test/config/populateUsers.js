const { User } = require("../../api/models/user");

const userOne = {
  name: "Populate User",
  email: "Populateusers@test.com",
  password: "Populateusers"
};

const populateUsers = (usr = userOne) => {
  return new Promise(async (resolve, reject) => {
    const user = new User(usr);
    try {
      await User.deleteMany();
      const newUser = await user.save();
      const token = newUser.createToken();
      return resolve({ token, slug: newUser.slug, authorId: newUser._id });
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = { populateUsers, userOne };
