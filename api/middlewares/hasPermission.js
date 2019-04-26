const ForbiddenError = require("../../errors/ForbiddenError");

module.exports = function(req, res, next) {
  // console.log(req.user.slug);
  // console.log(req.params.slug);
  if (req.user.slug == req.params.slug || req.user.role === "admin") {
    next();
  } else {
    // console.log("tutej ?");
    return next(new ForbiddenError("Access denied."));
  }
};
