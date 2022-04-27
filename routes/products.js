const express = require("express");
const { check } = require("express-validator");
const {
  handleGetProducts,
  handleCreateProducts,
  handleModifyProducts,
  handleDeleteProducts,
  handleGetOneProduct,
} = require("../controller/products.controller");
const {
  categoryExistsForDelete,
  productExistsForID,
} = require("../helpers/db.validator");
const { validateJWT, validateRole, validateFields } = require("../middlewares");

const products = express.Router();

products.get("/products", handleGetProducts);
products.get(
  "/products/:id",
  [
    check("id").isMongoId(),
    check("id").custom(productExistsForID),
    validateFields,
  ],
  handleGetOneProduct
);
products.post(
  "/products/create",
  [
    validateJWT,
    validateRole("ADMIN_ROLE", "SALES_ROLE"),
    check("name", "The name is empty").not().isEmpty(),
    check("description", "The description is empty").not().isEmpty(),
    check("description", "The description is too short").isLength({
      min: 8,
      max: 45,
    }),
    check("category", "The category is empty").not().isEmpty(),
    check("category", "The category's ID is wrong").isMongoId(),
    check("category").custom(categoryExistsForDelete),
    validateFields,
  ],
  handleCreateProducts
);

products.put(
  "/products/modify/:id",
  [
    validateJWT,
    validateRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id").isMongoId(),
    check("id").custom(productExistsForID),
    check("name", "The name is empty").not().isEmpty(),
    check("description", "The description is empty").not().isEmpty(),
    check("description", "The description is too short").isLength({
      min: 8,
      max: 45,
    }),
    check("category", "The category is empty").not().isEmpty(),
    check("category", "The category's ID is wrong").isMongoId(),
    check("category").custom(categoryExistsForDelete),
    validateFields,
  ],
  handleModifyProducts
);

products.delete(
  "/products/delete/:id",
  [
    validateJWT,
    validateRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id").isMongoId(),
    check("id").custom(productExistsForID),
    validateFields,
  ],
  handleDeleteProducts
);

module.exports = products;
