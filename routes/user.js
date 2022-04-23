const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// Routes controllers
const {
  handleGetAllUsers,
  handlePatch,
  handlePost,
  handleDelete,
  handleDefault,
} = require("../controller/users.controler.js");
const { validateFields } = require("../middlewares/validate.fields.js");

// Routes
router.get("/", handleGetAllUsers);
router.post(
  "/",
  [
    check("name", "Name value is empty").not().isEmpty(),
    check("pass", "Password must have more than 6 digits").isLength({ min: 6 }),
    check("mail", "Your mail is not valid").isEmail(),
    check("role", "Role selected does not exists").isIn([
      "ADMIN_ROLE",
      "USER_ROLE",
    ]),
    validateFields,
  ],
  handlePost
);
router.patch("/:id", handlePatch);
router.delete("/", handleDelete);
router.get("*", handleDefault);

module.exports = router;
