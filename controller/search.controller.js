const {
  searchUSers,
  searchCategories,
  searchProducts,
} = require("../helpers/search.db");
const writeLog = require("../log/log");
const allowedCollections = ["users", "products", "categories", "roles"];

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
        return searchProducts(res, params);
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
