const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "The name value is required "],
  },
  description: {
    type: String,
    required: [true, "The description value is required"],
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Category", CategorySchema);
