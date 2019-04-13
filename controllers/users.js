const { User, validate } = require("../models/user");

const registerUser = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ errorMessage: "User already exist" });

  const { name, email, password } = req.body;
  user = new User({ name, email, password });

  await user.save();

  const token = user.createToken();
  res.status("200").send({
    name: user.name,
    token
  });
};

const getUserInfo = async (req, res, next) => {
  const user = await User.findOne({ slug: req.params.slug }).select(
    "-password"
  );
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.send(user);
};

const deleteUser = async (req, res, next) => {
  if (req.user.slug === req.params.slug || req.user.role === "admin") {
    const user = await User.findOne({ slug: req.params.slug });
    if (!user) {
      return res.status(404).send("User not found");
    }
    await user.remove();
    res.send(user);
  } else {
    return res.status(403).send("Access denied.");
  }
};

module.exports = {
  registerUser,
  getUserInfo,
  deleteUser
};
