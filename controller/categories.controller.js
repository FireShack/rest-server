const writeLog = require("../log/log");
const categoryModel = require("../models/category.model");
const userModel = require("../models/user.model");

const handleGetOneCategory = async (req, res) => {
  const { id } = req.params;
  try {
    // Check the category
    // const categoryToGet = await categoryModel.findById(id);
    // Check the user that modified that category
    // const userModificator = await userModel.findById(categoryToGet.user);

    // You also can use this method
    const GetOneCategory = await categoryModel.findById(id).populate("user");

    // Send all data
    res.status(200).json({
      msg: "Getting this product",
      //   category: categoryToGet,
      //   "Last modification by": userModificator,
      category: GetOneCategory,
    });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", id, error });
    writeLog(error);
  }
};

const handleCategories = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;

  // Only those categories that are not delted
  const qDB = { state: true };
  try {
    // Check all categories and the amount
    const [categoriesAmount, allCategories] = await Promise.all([
      categoryModel.countDocuments(qDB),
      categoryModel.find(qDB).populate("user").limit(limit).skip(from),
    ]);
    // Send all data
    res.status(200).json({
      msg: "All categories",
      "Categories Amount": categoriesAmount,
      "All Categories": allCategories,
    });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

const handleCreateCategories = async (req, res) => {
  const { name, description } = req.body;
  const userID = req.uid;
  try {
    // Change the name to upper case
    const NAME = name.toUpperCase();

    // Create the category and save it
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
  // Take the user's id that want to update the product
  const userID = req.uid;
  const NAME = name.toUpperCase();
  try {
    // Update the category
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
  const userID = req.uid;
  try {
    // Find the cateogry and change the state to "false"
    const categoryToDelete = await categoryModel.findByIdAndUpdate(id, {
      state: false,
      user: userID,
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
