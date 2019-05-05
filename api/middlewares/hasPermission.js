const ForbiddenError = require("../../errors/ForbiddenError");

module.exports = function(req, res, next) {
  if (req.user.slug == req.params.slug || req.user.role === "admin") {
    next();
  } else {
    return next(new ForbiddenError("Access denied."));
  }
};
