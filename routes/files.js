const { check } = require("express-validator");
const express = require("express");
const {
  handleGetFiles,
  handlePostFiles,
  handlePutFiles,
  handleDeleteFiles,
} = require("../controller/files.controller");
const { validateFields } = require("../middlewares");
const { validateCollectionsFiles } = require("../helpers/db.validator");

const files = express.Router();

files.get(
  "/:collection/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    check("collection").custom((userCollection) =>
      validateCollectionsFiles(userCollection, ["users", "products"])
    ),
    validateFields,
  ],
  handleGetFiles
);
files.post("/add", handlePostFiles);
files.put("/modify/:collection/:id", handlePutFiles);
files.delete("/delete/:id", handleDeleteFiles);

module.exports = files;
