const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const generateSlug = require("../utils/generateSlug");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: "user"
  },
  slug: {
    type: String,
    required: false
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Post"
    }
  ]
});

userSchema.pre("save", async function(next) {
  const user = this;
  try {
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = cryptedPassword;
    user.slug = generateSlug(user.name);
    next();
  } catch (ex) {
    return next(ex);
  }
});

userSchema.methods.createToken = function() {
  return jwt.sign({ _id: this._id, role: this.role }, keys.JWT_SECRET);
};

const User = mongoose.model("User", userSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = {
  User,
  validate: validateUser
};
