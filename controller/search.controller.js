const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const writeLog = require("../log/log");
const categoryModel = require("../models/category.model");
const userModel = require("../models/user.model");

const allowedCollections = ["users", "products", "categories", "roles"];

const searchUSers = async (res = response, param) => {
  try {
    // Check if the ID is valid
    const isMongoId = ObjectId.isValid(param);

    // If it is, search it
    if (isMongoId) {
      const findUserById = await userModel.findById({ _id: param });
      return res.status(200).json({
        msg: "The user that you are searching",
        result: findUserById ? [findUserById] : [],
      });
    }

    // Search the user's name or mail. This is not key sensitive.
    const regEx = new RegExp(param, "i");
    const findUserByName = await userModel.find({
      $or: [{ name: regEx }, { mail: regEx }],
    });

    // If it's found, send it. If anything match, return an empty array
    if (findUserByName) {
      return res.status(200).json({
        msg: `The user that you are searching`,
        result: findUserByName ? [findUserByName] : [],
      });
    }
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

const searchCategories = async (res = response, param) => {
  try {
    // Search the name. This is not key sensitive.
    const regEx = new RegExp(param, "i");
    const findCategoryByName = await categoryModel.find({
      name: regEx,
    });

    // If you it's found, send it. If anything match, return an empty array
    res.status(200).json({
      msg: `The category that you are searching`,
      result: findCategoryByName ? [findCategoryByName] : [],
    });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

const handleSearch = (req, res) => {
  const { collection, params } = req.params;
  try {
    // If the user sends a collection that is not allowed, an error will be returned
    if (!allowedCollections.includes(collection)) {
      return res.status(400).json({
        msg: "The collection selected is not valid",
        "Search in": allowedCollections,
      });
    }

    // If the last validation is ok, check which collection match
    switch (collection) {
      case "users":
        return searchUSers(res, params);
      case "categories":
        return searchCategories(res, params);
      case "products":
        break;
      case "roles":
        break;

      default:
        return res
          .status(500)
          .json({ msg: "That collection was not created yet" });
    }
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

module.exports = {
  handleSearch,
};
