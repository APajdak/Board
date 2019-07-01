const isString = require("./isString");
const isEmpty = require("./isEmpty");
const hasProperLength = require("./hasProperLength");

module.exports = ({ name }) => {
  const errors = {};
  // Name field validation
  if (!isString(name)) {
    errors.name = "Name must be a string";
  }
  if (isString(name) && !hasProperLength(name, 3, 255)) {
    errors.name = "Name must be between 3 and 255 characters";
  }
  if (isEmpty(name)) {
    errors.name = "Name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
