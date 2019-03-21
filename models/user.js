const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

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
    minlength: 5,
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
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

userSchema.pre("save", async function(next) {
  const user = this;
  try {
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = cryptedPassword;
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
      .min(5)
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
