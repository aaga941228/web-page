function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/admin/login");
  }
}

module.exports = { isAuthenticated };
