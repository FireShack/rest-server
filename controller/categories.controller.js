const writeLog = require("../log/log");
const categoryModel = require("../models/category.model");
const userModel = require("../models/user.model");

const handleGetOneCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const categoryToGet = await categoryModel.findById(id);
    const userModificator = await userModel.findById(categoryToGet.user);

    // const GetOneCategory = await categoryModel.findById(id).populate("user");

    res.status(200).json({
      msg: "Getting this product",
      category: categoryToGet,
      "Last modification by": userModificator,
      // category: GetOneCategory,
    });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", id, error });
    writeLog(error);
  }
};

const handleCategories = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const qDB = { state: true };
  try {
    const [categoriesAmount, allCategories] = await Promise.all([
      categoryModel.countDocuments(qDB),
      categoryModel.find(qDB).limit(limit).skip(from),
    ]);

    res.status(200).json({
      msg: "All categories",
      "Categories Amount": categoriesAmount,
      "All Categories": allCategories,
    });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
  }
};

const handleCreateCategories = async (req, res) => {
  const { name, description } = req.body;
  const userID = req.uid;
  try {
    const NAME = name.toUpperCase();

    const newCategory = new categoryModel({
      name: NAME,
      description,
      user: userID,
    });

    await newCategory.save();
    res.status(200).json({ msg: "New category added:", newCategory });
  } catch (error) {
    res.status(400).json({ msg: `The arguments are incorrect ${error}` });
    writeLog(error);
  }
};

const handleModifyCategories = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userID = req.uid;
  const NAME = name.toUpperCase();
  try {
    const categoryExists = await categoryModel.findByIdAndUpdate(id, {
      name: NAME,
      user: userID,
      description,
    });

    res.status(200).json({
      msg: "Category modified",
      id,
      category: categoryExists,
    });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error, id });
  }
};

const handleDeleteCategories = async (req, res) => {
  const { id } = req.params;
  try {
    const categoryToDelete = await categoryModel.findByIdAndUpdate(id, {
      state: false,
    });
    res.status(200).json({ msg: "Category deleted", id, categoryToDelete });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

module.exports = {
  handleCategories,
  handleCreateCategories,
  handleModifyCategories,
  handleDeleteCategories,
  handleGetOneCategory,
};
