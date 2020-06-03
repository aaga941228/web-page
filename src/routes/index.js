const { Router } = require("express");
const router = Router();
const {
  index,
  sendEmail,
  successEmail,
  login,
  loginRender,
  dashboard,
} = require("../controllers");

router
  .get("/", index)
  .post("/send-email", sendEmail)
  .get("/success", successEmail)
  .get("/admin/dashboard", dashboard)
  .get("/admin/login", loginRender)
  .post("/admin/login", login);

module.exports = router;
