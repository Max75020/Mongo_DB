const { AccountLine } = require("../models");
const express = require("express");
const router = express();

const userCtrl = require("../controllers/account-line.js");
router.get("/hello", userCtrl.hello);

module.exports = router;