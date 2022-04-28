const validateUpload = require("../helpers/validate.upload");
const writeLog = require("../log/log");
const productsModel = require("../models/products.model");
const userModel = require("../models/user.model");

const handleGetFiles = (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).json({ msg: `This is the file ${id}` });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

const handlePostFiles = async (req, res) => {
  const { file } = req.files;
  try {
    if (!req.files) {
      return res
        .status(400)
        .json({ msg: "You must provide at least one file" });
    }
    await validateUpload(file, ["jpg"], "imgs");

    res.status(200).json({ msg: "File loaded successfully", file });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

const handlePutFiles = async (req, res) => {
  const { collection, id } = req.params;
  const { file } = req.files;
  let model;
  try {
    switch (collection) {
      case "users":
        model = await userModel.findById({ _id: id });
        if (!model) {
          return res
            .status(400)
            .json({ msg: `The file ${id} does not exists` });
        }
        break;
      case "products":
        model = await productsModel.findById({ _id: id });
        if (!model) {
          return res
            .status(400)
            .json({ msg: `The file ${id} does not exists` });
        }
        break;

      default:
        return res.status(500).json({ msg: "The collection does not exists" });
    }

    const newImg = await validateUpload(file, undefined, collection);
    model.img = newImg;
    await model.save();

    res.status(200).json({
      msg: `File ${id} modified successfully`,
      model,
      "New img": newImg,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

const handleDeleteFiles = (req, res) => {
  try {
    res.status(200).json({ msg: `File ${id} deleted successfully` });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

module.exports = {
  handleGetFiles,
  handlePostFiles,
  handlePutFiles,
  handleDeleteFiles,
};
