const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const BadRequestError = require("../errors/BadRequestError");
const loginValidation = require("../validation/login");

const logIn = async (req, res, next) => {
  const { isValid, errors } = loginValidation(req.body);
  if (!isValid) return next(new BadRequestError("Invalid login data", errors));

  let user = await User.findOne({ email: req.body.email });
  if (!user) return next(new BadRequestError("Invalid email or password"));

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return next(new BadRequestError("Invalid email or password"));

  const token = user.createToken();

  res.json({ name: user.name, token });
};
module.exports = {
  logIn
};
