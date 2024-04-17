const express = require("express");
const router = express();
const userRoutes = require('./user.js');
const accountRoutes = require('./account.js');
const accountLineRoutes = require('./account-line.js');


router.use("/user", userRoutes)
router.use("/account", accountRoutes)
router.use("/account-line", accountLineRoutes)


module.exports = router