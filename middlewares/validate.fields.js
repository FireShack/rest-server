const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  // Express validation
  const errors = validationResult(req);
  // Check express validation
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  // Goes to the next validation or to the controller
  next();
};

module.exports = {
  validateFields,
};
