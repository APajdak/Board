const ApplicationError = require("./ApplicationError");

module.exports = class ForbiddenError extends ApplicationError {
  constructor(message = "Not found") {
    super(message, "403");
  }
};
