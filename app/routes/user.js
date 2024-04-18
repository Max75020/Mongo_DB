const express = require("express");
const router = express();
const auth = require("../middlewares/auth.js")

const userCtrl = require("../controllers/user.js");
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;