const ApplicationError = require("./ApplicationError");

module.exports = class UnauthorizedError extends ApplicationError {
  constructor(message = "Unauthorized") {
    super(message, "401");
  }
};
