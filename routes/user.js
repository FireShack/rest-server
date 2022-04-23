const express = require("express");
const router = express.Router();

// Routes controllers
const {
  handleGetAllUsers,
  handlePatch,
  handlePost,
  handleDelete,
  handleDefault,
} = require("../controller/users.controler.js");

// Routes
router.get("/", handleGetAllUsers);
router.post("/", handlePost);
router.patch("/:id", handlePatch);
router.delete("/", handleDelete);
router.get("*", handleDefault);

module.exports = router;
