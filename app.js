const express = require("express");
const router = require("./app/routes/index.js");
require("./app/models/index.js");

const app = express();
app.use("/api", router);

module.exports = app;