const JWT = require("jsonwebtoken");
const writeLog = require("../log/log");
const userModel = require("../models/user.model");

const validateJWT = async (req, res, next) => {
  //   Take the token
  const token = req.header("token");
  //   Token non provided
  if (!token) {
    return res.status(400).json({ msg: "You must provide a token" });
  }
  // Try to validate the token
  try {
    const { uid } = JWT.verify(token, process.env.PRIVATE_KEY);
    req.uid = uid;
    // Find the user with the uid provided by the token
    const { name, mail, role } = await userModel.findById({ _id: uid });
    // Send that user
    req.userData = { name, mail, role };
    next();
  } catch (error) {
    res.status(400).json({ msg: "Your token is not valid" });
    writeLog(error);
  }
};

module.exports = validateJWT;
