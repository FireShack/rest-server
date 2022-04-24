const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// Routes controllers
const {
  handleGetAllUsers,
  handlePut,
  handlePost,
  handleDelete,
} = require("../controller/users.controler.js");
const {
  validRole,
  validMail,
  userExists,
} = require("../helpers/db.validator.js");
const { validateFields } = require("../middlewares/validate.fields.js");

// Routes
router.get("/", handleGetAllUsers);
router.put(
  "/:id",
  [
    check("id", "The ID is not valid").isMongoId(),
    check("id").custom(userExists),
    check("role").custom(validRole),
    validateFields,
  ],
  handlePut
);
router.post(
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

router.delete(
  "/:id",
  [
    check("id", "The ID is not valid").isMongoId(),
    check("id").custom(userExists),
    validateFields,
  ],
  handleDelete
);

module.exports = router;
