const mongoose = require("mongoose");
const generateSlug = require("../utils/generateSlug");

const forumSchema = new mongooose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  slug: {
    type: String,
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
  const forum = this;
  forum.slug = generateSlug(forum.name);
  next();
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = {
  Forum
};
