const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const UnauthorizedError = require("../errors/UnauthorizedError");
const BadRequestError = require("../errors/BadRequestError");

function isLogged(req, res, next) {
  const header = req.get("x-access-token");
  if (header) {
    var token = header.split(" ")[1];
  } else {
    return next(new UnauthorizedError("Access denied."));
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    return next(new BadRequestError("Invalid token."));
  }
}

module.exports = isLogged;
