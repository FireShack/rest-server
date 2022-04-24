const RoleModel = require("../models/role.model");
const UserModel = require("../models/user.model");

const validRole = async (role = "") => {
  // Check if role exists into the DB
  const roleExists = await RoleModel.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role "${role}" do not exists`);
  }
};
const validMail = async (mail = "") => {
  // Check if mail exists into the DB
  const mailExists = await UserModel.findOne({ mail });
  if (mailExists) {
    throw new Error(`Mail ${mail} already exists`);
  }
};

const userExists = async (id = "") => {
  // Check if ID exists into the DB
  const userExists = await UserModel.findById(id);
  if (!userExists) {
    throw new Error(`The user do not exists or is already registered`);
  }
};

module.exports = {
  validRole,
  validMail,
  userExists,
};
