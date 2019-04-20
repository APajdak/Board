const ApplicationError = require("./ApplicationError");

module.exports = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.status).json(err);
  }
  return next();
};
