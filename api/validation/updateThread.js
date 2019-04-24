const isString = require("./isString");
const isEmpty = require("./isEmpty");
const hasProperLength = require("./hasProperLength");

module.exports = ({ title }) => {
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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
