const productsModel = require("../models/products.model");
const userModel = require("../models/user.model");

const searchImgInDB = async (req, res, next) => {
  const { collection, id } = req.params;
  let model;
  switch (collection) {
    case "users":
      model = await userModel.findById({ _id: id });
      if (!model) {
        return res.status(404).json({ msg: `The file ${id} does not exists` });
      }
      break;
    case "products":
      model = await productsModel.findById({ _id: id });
      if (!model) {
        return res.status(404).json({ msg: `The file ${id} does not exists` });
      }
      break;

    default:
      return res.status(500).json({ msg: "The collection does not exists" });
  }
  req.model = { model };

  next();
};

module.exports = searchImgInDB;
