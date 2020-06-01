const { Router } = require("express");
const router = Router();
const { index, sendEmail, successEmail } = require("../controllers");

router
  .get("/", index)
  .post("/send-email", sendEmail)
  .get("/success", successEmail);

module.exports = router;
