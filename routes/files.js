const { check } = require("express-validator");
const express = require("express");
const {
  handleGetFiles,
  handlePostFiles,
  handlePutFiles,
  handleDeleteFiles,
} = require("../controller/files.controller");

const files = express.Router();

files.get("/", handleGetFiles);
files.post("/add", handlePostFiles);
files.put("/modify/:id", handlePutFiles);
files.delete("/delete/:id", handleDeleteFiles);

module.exports = files;
