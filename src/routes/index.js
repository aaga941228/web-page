const { Router } = require("express");
const passport = require("passport");
const router = Router();
const {
  index,
  home,
  sendEmail,
  successEmail,
  loginRender,
  dashboard,
  logout,
} = require("../controllers");
const { isAuthenticated } = require("../helpers/auth");

router
  .get("/", index)
  .post("/send-email", sendEmail)
  .get("/success", successEmail)
  .get("/admin/dashboard", isAuthenticated, dashboard)
  .get("/admin/login", loginRender)
  .get("/admin/logout", logout)
  .post(
    "/admin/login",
    passport.authenticate("local", {
      successRedirect: "/admin/dashboard",
      failureRedirect: "/admin/login",
    })
  );

module.exports = router;
