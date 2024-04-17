const express = require("express");
const router = express();

const userCtrl = require("../controllers/user.js");
router.get("/hello", userCtrl.hello);

module.exports = router;