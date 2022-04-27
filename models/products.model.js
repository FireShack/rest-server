const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
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
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, ...product } = this.toObject();
  return product;
};
module.exports = model("Product", ProductSchema);
