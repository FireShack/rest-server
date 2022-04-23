const mongoose = require("mongoose");

const dbConnection = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("All ok");
  } catch (error) {
    console.log("All bad:", error);
  }
};

module.exports = {
  dbConnection,
};
