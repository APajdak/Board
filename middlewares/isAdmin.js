module.exports = function(req, res, next) {
  if (req.user.role === "admin") {
    next();
  } else {
    return next(new ForbiddenError("Access denied."));
  }
};
