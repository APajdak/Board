module.exports = class ApplicationError extends Error {
  constructor(message = "An unexpected error occurred", status = "500") {
    super();
    this.status = status;
    this.code = this.constructor.name;
    this.message = message;
  }
};
