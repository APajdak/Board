const isString = require("./isString");
const isEmpty = require("./isEmpty");
const isValidEmail = require("./isValidEmail");
const hasProperLength = require("./hasProperLength");

module.exports = ({ name, email }) => {
  const errors = {};

  // Name field validation
  if (!name) {
    if (!isString(name)) {
      errors.name = "Name must be a string";
    }
    if (isString(name) && !hasProperLength(name, 2, 50)) {
      errors.name = "Name must be between 2 and 50 characters";
    }
    if (isEmpty(name)) {
      errors.name = "Name is required";
    }
  }
  //Email field validation
  if (!email) {
    if (!isString(email)) {
      errors.email = "Email must be a string";
    }
    if (isString(email) && !isValidEmail(email)) {
      errors.email = "Email is invalid";
    }
    if (isEmpty(email)) {
      errors.email = "Email field is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
