const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  slug: {
    type: String,
    trim: true,
    required: false
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Thread"
    }
  ]
});

forumSchema.pre("save", function(next) {
  const { Slug } = require("../../index.js");
  const forum = this;
  forum.slug = Slug.addSlug(forum.name);
  next();
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = {
  Forum
};
