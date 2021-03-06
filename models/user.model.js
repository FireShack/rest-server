const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "The name value is required"],
  },
  mail: {
    type: String,
    required: [true, "The mail value is required"],
    unique: true,
  },
  pass: {
    type: String,
    required: [true, "The password value is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "The role value is required"],
    enum: ["ADMIN_ROLE", "USER_ROLE", "SALES_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// This function take out the __v and the user's password of the response
UserSchema.methods.toJSON = function () {
  const { __v, _id, pass, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
