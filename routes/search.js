const express = require("express");
const { handleSearch } = require("../controller/search.controller");
const search = express.Router();

search.get("/:collection/:params", handleSearch);

module.exports = search;
