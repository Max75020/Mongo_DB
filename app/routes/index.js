const express = require("express");
const router = express();
const userRoutes = require('./user.js');

router.use("/user", userRoutes)

module.exports = router