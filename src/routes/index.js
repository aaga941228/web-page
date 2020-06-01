const { Router } = require("express");
const router = Router();
const { index, sendEmail } = require("../controllers");

router.get("/", index).post("/send/email", sendEmail);

module.exports = router;
