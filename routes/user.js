const express = require("express");
const user = express.Router();
const { check } = require("express-validator");

// Routes controllers
const {
  handleGetAllUsers,
  handlePut,
  handlePost,
  handleDelete,
} = require("../controller/users.controler.js");
// DB validations
const {
  validRole,
  validMail,
  userExists,
} = require("../helpers/db.validator.js");
// Own middleware
const { validateFields } = require("../middlewares/validate.fields.js");
const validateJWT = require("../middlewares/validate.jwt.js");
const {
  validateRole,
  validateAdmin,
} = require("../middlewares/validate.role.js");

// Routes
user.get(
  "/",
  [validateJWT, validateRole("USER_ROLE", "ADMIN_ROLE", "SALES_ROLE")],
  handleGetAllUsers
);

user.put(
  "/:id",
  [
    validateJWT,
    validateAdmin,
    check("id", "The ID is not valid").isMongoId(),
    check("id").custom(userExists),
    check("role").custom(validRole),
    validateFields,
  ],
  handlePut
);

user.post(
  "/",
  [
    check("name", "Name value is empty").not().isEmpty(),
    check("pass", "Password must have more than 6 digits").isLength({ min: 6 }),
    check("mail", "Your mail is not valid").isEmail(),
    check("mail").custom(validMail),
    check("role").custom(validRole),
    validateFields,
  ],
  handlePost
);

user.delete(
  "/:id",
  [
    validateJWT,
    validateAdmin,
    check("id", "The ID is not valid").isMongoId(),
    check("id").custom(userExists),
    validateFields,
  ],
  handleDelete
);

module.exports = user;
