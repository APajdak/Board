const { User, validate } = require("../models/user");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const registerUser = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return next(new BadRequestError(error.details[0].message));

  let user = await User.findOne({ email: req.body.email });
  if (user) return next(new BadRequestError("User already exist"));

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
    return next(new NotFoundError("User not found"));
  }
  res.send(user);
};

const deleteUser = async (req, res, next) => {
  if (req.user.slug === req.params.slug || req.user.role === "admin") {
    const user = await User.findOne({ slug: req.params.slug });
    if (!user) {
      return next(new NotFoundError("User not found"));
    }
    await user.remove();
    res.send(user);
  } else {
    return next(new ForbiddenError("Access denied."));
  }
};

module.exports = {
  registerUser,
  getUserInfo,
  deleteUser
};
