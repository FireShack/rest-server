const {} = require("mongoose");
const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, "Role input is required"],
  },
});

module.exports = model("Role", RoleSchema);