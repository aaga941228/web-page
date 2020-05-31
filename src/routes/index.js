const { Router } = require("express");
const router = Router();
const { index } = require("../controllers");

router.get("*", index);

module.exports = router;
