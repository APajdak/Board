const isString = require("./isString");
const isEmpty = require("./isEmpty");
const hasProperLength = require("./hasProperLength");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = ({ title, forumId, authorId }) => {
  const errors = {};

  // Title field validation
  if (!isString(title)) {
    errors.title = "Title must be a string";
  }
  if (isString(title) && !hasProperLength(title, 3, 255)) {
    errors.title = "Title must be between 3 and 255 characters";
  }
  if (isEmpty(title)) {
    errors.title = "Title is required";
  }

  // Forum Id validation

  if (!ObjectId.isValid(forumId)) {
    errors.forumId = "ForumId is invalid";
  }

  // Author Id validation
  if (!ObjectId.isValid(authorId)) {
    errors.authorId = "AuthorId is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
