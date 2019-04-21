const ApplicationError = require("./ApplicationError");

module.exports = (err, req, res, next) => {
  if (err.name === "MongoError") {
    return res.status(503).json(err.errmsg);
  }

  if (err instanceof ApplicationError) {
    return res.status(err.status).json(err);
  }
  return next();
};
