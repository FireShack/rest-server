// Own middleware
const validateFields = require("../middlewares/validate.fields.js");
const validateJWT = require("../middlewares/validate.jwt.js");
const {
  validateRole,
  validateAdmin,
} = require("../middlewares/validate.role.js");

module.exports = {
  ...validateFields,
  validateJWT,
  validateAdmin,
  validateRole,
};
