const { User } = require("../../api/models/user");

const userOne = {
  name: "Populateusers",
  email: "Populateusers@test.com",
  password: "Populateusers"
};

const populateUsers = () => {
  return new Promise(async (resolve, reject) => {
    const user = new User(userOne);
    try {
      await User.deleteMany();
      const newUser = await user.save();
      const token = newUser.createToken();
      return resolve({ token, slug: newUser.slug });
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = { populateUsers, userOne };
