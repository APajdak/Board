const ApplicationError = require("./ApplicationError");

module.exports = class BadRequestError extends ApplicationError {
  constructor(message = "Bad request", errors) {
    super(message, "400");
    if (errors) this.errors = errors;
  }
};
