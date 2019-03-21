const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

function isLogged(req, res, next) {
  const header = req.get("x-access-token");
  if (header) {
    // Removing Bearer
    // used var to make variable visible in try - catch block
    var token = header.split(" ")[1];
  } else {
    return res.status(401).send("Access denied.");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = isLogged;
