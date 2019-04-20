const ApplicationError = require("./ApplicationError");

module.exports = class NotFoundError extends ApplicationError {
  constructor(message = "Not found") {
    super(message, "403");
  }
};
