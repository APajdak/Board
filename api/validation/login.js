const isString = require("./isString");
const isEmpty = require("./isEmpty");
const isValidEmail = require("./isValidEmail");
const hasProperLength = require("./hasProperLength");

module.exports = ({ email, password }) => {
  const errors = {};

  //Email field validation

  if (!isString(email)) {
    errors.email = "Email must be a string";
  }
  if (isString(email) && !isValidEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (isEmpty(email)) {
    errors.email = "Email field is required";
  }

  //password validation
  if (!isString(password)) {
    errors.password = "Password must be a string";
  }
  if (isString(password) && !hasProperLength(password, 3, 300)) {
    errors.password = "Password must be between 3 and 300 characters";
  }
  if (isEmpty(password)) {
    errors.password = "Password field is required";
  }

  console.log(errors);
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
