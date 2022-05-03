const categoryModel = require("../models/category.model");
const productsModel = require("../models/products.model");
const RoleModel = require("../models/role.model");
const userModel = require("../models/user.model");

const validRole = async (role = "") => {
  // Check if role exists into the DB
  const roleExists = await RoleModel.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role "${role}" do not exists`);
  }
};
const validMail = async (mail = "") => {
  // Check if mail exists into the DB
  const mailExists = await userModel.findOne({ mail });
  if (mailExists) {
    throw new Error(`Mail ${mail} already exists`);
  }
};

const userExists = async (id = "") => {
  // Check if ID exists into the DB
  const userExists = await userModel.findById(id);
  if (!userExists) {
    throw new Error(`The user do not exists or is already registered`);
  }
};

const categoryExists = async (name = "") => {
  const NAME = name.toUpperCase();
  const category = await categoryModel.findOne({ name: NAME });
  if (category) {
    throw new Error(`The category ${NAME} already exists`);
  }
};

const categoryNotExists = async (name = "") => {
  const NAME = name.toUpperCase();
  const category = await categoryModel.findOne({ name: NAME });
  if (!category || !category.state) {
    throw new Error(`The category ${NAME} does not exists`);
  }
};

const categoryExistsForDelete = async (id = "") => {
  const category = await categoryModel.findById({ _id: id });
  if (!category || !category.state) {
    throw new Error(`Category with id ${id} does not exists`);
  }
};

const productExistsForID = async (id = "") => {
  const product = await productsModel.findById({ _id: id });
  if (!product || !product.state) {
    throw new Error(`Product with id ${id} does not exists`);
  }
};

const validateCollectionsFiles = async (collection = "", collections = []) => {
  const include = collections.includes(collection);
  if (!include) {
    throw new Error(
      `The collection ${collection} is not allowed. Expect ${collections}.`
    );
  }
  return true;
};

const validateFileIntoCollection = async (id = "", collection = "") => {
  const idExistsInCollec = await userModel.findOne(id);
  
  if (!idExistsInCollec) {
    throw new Error(`The file ${id} does not exists intot ${collection}`);
  }
};

module.exports = {
  validRole,
  validMail,
  userExists,
  categoryExists,
  categoryNotExists,
  categoryExistsForDelete,
  productExistsForID,
  validateCollectionsFiles,
  validateFileIntoCollection,
};
