const { Account } = require("../models");
const express = require("express");
const router = express();
const auth = require("../middlewares/auth.js")

const accountCtrl = require("../controllers/account.js");
router.get("/",auth, accountCtrl.readAllAccounts);
router.get("/:id",auth, accountCtrl.readAccount);
router.post("/",auth, accountCtrl.createAccount);
router.put("/:id",auth, accountCtrl.updateAccount);
router.delete("/:id",auth, accountCtrl.deleteAccount);

module.exports = router;