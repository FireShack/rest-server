const { request } = require("express");

const validateFile = (req = request, res, next) => {
  if (!req.files) {
    return res.status(400).json({ msg: "You must provide a file" });
  }
  next();
};

module.exports = validateFile;
