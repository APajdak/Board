const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/keys");

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
    trim: true,
    minlength: 3,
    maxlength: 300
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    trim: true,
    default: "user"
  },
  slug: {
    type: String,
    trim: true,
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
  const { Slug } = require("../../index.js");
  const user = this;
  try {
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = cryptedPassword;
    user.slug = Slug.addSlug(user.name);
    next();
  } catch (ex) {
    return next(ex);
  }
});

userSchema.methods.createToken = function() {
  return jwt.sign(
    { _id: this._id, role: this.role, slug: this.slug, name: this.name },
    JWT_SECRET
  );
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User
};
