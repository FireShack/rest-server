const express = require("express");
const { check } = require("express-validator");
const {
  handleCategories,
  handleCreateCategories,
  handleModifyCategories,
  handleDeleteCategories,
  handleGetOneCategory,
} = require("../controller/categories.controller");
const {
  categoryExists,
  categoryNotExists,
} = require("../helpers/db.validator");
const { validateFields, validateRole, validateJWT } = require("../middlewares");

const categories = express.Router();

categories.get("/categories", handleCategories);
categories.get("/categories/:id", handleGetOneCategory);

categories.post(
  "/categories/create",
  [
    validateJWT,
    validateRole("ADMIN_ROLE", "SALES_ROLE"),
    check("name", "Name value is empty").not().isEmpty(),
    check("name").custom(categoryExists),
    check("description", "The description is empty").not().isEmpty(),
    check("description", "The description is empty").isLength({ max: 40 }),
    validateFields,
  ],
  handleCreateCategories
);

categories.put(
  "/categories/modify/:id",
  [
    validateJWT,
    validateRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Wrong ID").isMongoId(),
    check("name", "Name value is empty").not().isEmpty(),
    check("name").custom(categoryNotExists),
    check("description", "Description too large").isLength({ max: 40 }),
    check("description", "The description is empty").not().isEmpty(),
    validateFields,
  ],
  handleModifyCategories
);

categories.delete(
  "/categories/delete/:id",
  [
    validateJWT,
    validateRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Wrong ID").isMongoId(),
    validateFields,
  ],
  handleDeleteCategories
);

module.exports = categories;
