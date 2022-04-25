const express = require("express");
const auth = express.Router();

auth.post("/login");

module.exports = auth;
