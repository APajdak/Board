const { User } = require("../models/user");
const BadRequestError = require("../../errors/BadRequestError");
const NotFoundError = require("../../errors/NotFoundError");
const isEmpty = require("../validation/isEmpty");
const userValidation = require("../validation/registerUser");
const updateUserValidation = require("../validation/updateUser");

const registerUser = async (req, res, next) => {
  const { isValid, errors } = userValidation(req.body);
  if (!isValid)
    return next(new BadRequestError("Invalid register data", errors));

  let user = await User.findOne({ email: req.body.email });
  if (user) return next(new BadRequestError("User already exist"));

  const { name, email, password } = req.body;
  user = new User({ name, email, password });

  await user.save();

  const token = user.createToken();
  res.status("201").send({
    token
  });
};

const getUserInfo = async (req, res, next) => {
  const user = await User.findOne({ slug: req.params.slug }).select(
    "-password"
  );

  if (!user) {
    return next(new NotFoundError("User not found"));
  }
  res.send(user);
};

const deleteUser = async (req, res, next) => {
  const user = await User.findOne({ slug: req.params.slug });
  if (!user) {
    return next(new NotFoundError("User not found"));
  }
  await user.remove();
  res.send(user);
};

const updateUser = async (req, res, next) => {
  const { isValid, errors } = updateUserValidation(req.body);
  if (!isValid) return next(new BadRequestError("Invalid update data", errors));

  const { name, email } = req.body;
  const newData = {};
  if (!isEmpty(name)) newData.name = name;
  if (!isEmpty(email)) newData.email = email;

  const user = await User.findOneAndUpdate({ slug: req.params.slug }, newData, {
    new: true
  });
  res.json(user);
};

module.exports = {
  registerUser,
  getUserInfo,
  deleteUser,
  updateUser
};
