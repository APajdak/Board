const ApplicationError = require("./ApplicationError");

module.exports = class BadRequestError extends ApplicationError {
  constructor(message = "Bad request") {
    super(message, "400");
  }
};
