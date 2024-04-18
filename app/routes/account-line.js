const { AccountLine } = require("../models");
const express = require("express");
const router = express();
const auth = require("../middlewares/auth.js")

const accountLineCtrl = require("../controllers/account-line.js");
router.get("/",auth, accountLineCtrl.readAllAccountsLine);
router.get("/:id",auth, accountLineCtrl.readAccountLine);
router.post("/",auth, accountLineCtrl.createAccountLine);
router.put("/:id",auth, accountLineCtrl.updateAccountLine);
router.delete("/:id",auth, accountLineCtrl.deleteAccountLine);

module.exports = router;