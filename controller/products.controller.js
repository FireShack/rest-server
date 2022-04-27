const writeLog = require("../log/log");
const productsModel = require("../models/products.model");

const handleGetProducts = async (req, res) => {
  try {
    res.status(200).json({ msg: "This are the products" });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

const handleCreateProducts = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const userID = req.uid;
    const NAME = name.toUpperCase();

    const saveProduct = new productsModel({
      name: NAME,
      description,
      price,
      category,
      user: userID,
    });
    await saveProduct.save();

    res.status(200).json({ msg: `Product ${NAME} created successfully` });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

const handleModifyProducts = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  const userID = req.uid;
  const NAME = name.toUpperCase();
  try {
    await productsModel.findByIdAndUpdate(id, {
      name: NAME,
      description,
      price,
      category,
      user: userID,
    });

    res.status(200).json({ msg: `Product ${NAME} modified successfully` });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

module.exports = {
  handleGetProducts,
  handleCreateProducts,
  handleModifyProducts,
};
