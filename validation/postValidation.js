const isString = require("./isString");
const isEmpty = require("./isEmpty");
const hasProperLength = require("./hasProperLength");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = ({ content, threadId, authorId }) => {
  const errors = {};

  // Content field validation
  if (!isString(content)) {
    errors.content = "Content must be a string";
  }
  if (isString(content) && !hasProperLength(content, 2, 2048)) {
    errors.content = "Content must be between 2 and 2048 characters";
  }
  if (isEmpty(content)) {
    errors.content = "Content is required";
  }

  // Thread Id validation

  if (!ObjectId.isValid(threadId)) {
    errors.threadId = "ThreadId is invalid";
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
