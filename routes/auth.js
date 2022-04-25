const express = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controller/auth.controller");
const { validateFields } = require("../middlewares/validate.fields");
const auth = express.Router();

auth.post(
  "/login",
  [
    check("mail", "Your mail is not valid").isEmail(),
    check("pass", "Invalid password").not().isEmpty(),
    validateFields,
  ],
  login
);
auth.post(
  "/login/google",
  [check("id_token", "You must provide an ID").not().isEmpty(), validateFields],
  googleSignIn
);

module.exports = auth;
