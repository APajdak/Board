const isString = require("./isString");
const isEmpty = require("./isEmpty");
const hasProperLength = require("./hasProperLength");

module.exports = ({ content }) => {
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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
