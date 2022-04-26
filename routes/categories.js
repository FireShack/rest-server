const express = require("express");
const { check } = require("express-validator");
const {
  handleCategories,
  handleCreateCategories,
  handleModifyCategories,
  handleDeleteCategories,
  handleGetOneCategory,
} = require("../controller/categories.controller");
const { validateFields, validateRole, validateJWT } = require("../middlewares");

const categories = express.Router();

// TODO Own middleware to validate if caregory exists

categories.get("/categories", handleCategories);
categories.get("/categories/:id", handleGetOneCategory);

categories.post(
  "/categories/create",
  [validateJWT, validateRole("ADMIN_ROLE", "SALES_ROLE"), validateFields],
  handleCreateCategories
);

categories.put(
  "/categories/modify/:id",
  [
    validateJWT,
    validateRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Wrong ID").isMongoId(),
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
