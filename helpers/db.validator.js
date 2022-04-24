const RoleModel = require("../models/role.model");
const UserModel = require("../models/user.model");

const validRole = async (role = "") => {
  const roleExists = await RoleModel.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role "${role}" do not exists`);
  }
};
const validMail = async (mail = "") => {
  const mailExists = await UserModel.findOne({ mail });
  if (mailExists) {
    throw new Error(`Mail ${mail} already exists`);
  }
};

module.exports = {
  validRole,
  validMail,
};
