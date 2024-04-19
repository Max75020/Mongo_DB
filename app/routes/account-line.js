const { AccountLine } = require("../models");
const express = require("express");
const router = express();
const auth = require("../middlewares/auth.js")

const accountLineCtrl = require("../controllers/account-line.js");
router.get("/:accountId",auth, accountLineCtrl.getAllAccountsLine);
router.post("/:accountId",auth, accountLineCtrl.createAccountLine);

router.get("/:lineId",auth, accountLineCtrl.readAccountLine);
router.put("/:lineId",auth, accountLineCtrl.updateAccountLine);
router.delete("/:lineId",auth, accountLineCtrl.deleteAccountLine);

module.exports = router;