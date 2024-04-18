const { AccountLine } = require("../models");
const express = require("express");
const router = express();

const accountLineCtrl = require("../controllers/account-line.js");
router.get("/", accountLineCtrl.readAllAccountsLine);
router.get("/:id", accountLineCtrl.readAccountLine);
router.post("/", accountLineCtrl.createAccountLine);
router.put("/:id", accountLineCtrl.updateAccountLine);
router.delete("/:id", accountLineCtrl.deleteAccountLine);

module.exports = router;