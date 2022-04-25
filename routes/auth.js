const express = require("express");
const { check } = require("express-validator");
const { login } = require("../controller/auth.controller");
const { validateFields } = require("../middlewares/validate.fields");
const auth = express.Router();

auth.post(
  "/login",
  [check("mail", "Your mail is not valid").isEmail(), validateFields],
  [check("pass", "Invalid password").not().isEmpty(), validateFields],
  login
);

module.exports = auth;
