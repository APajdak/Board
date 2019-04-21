const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const BadRequestError = require("../errors/BadRequestError");

const logIn = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return next(new BadRequestError(error.details[0].message));

  let user = await User.findOne({ email: req.body.email });
  if (!user) return next(new BadRequestError("Invalid email or password"));

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return next(new BadRequestError("Invalid email or password"));

  const token = user.createToken();

  res.json({ user: { name: user.name, slug: user.slug }, token });
};

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(300)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = {
  logIn
};
