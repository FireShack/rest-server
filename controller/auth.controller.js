const writeLog = require("../log/log");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");

const login = async (req, res) => {
  const { mail, pass } = req.body;
  try {
    // Does user exists?
    const userExists = await userModel.findOne({ mail });
    if (!userExists || !userExists.state) {
      return res.status(400).json({
        msg: `You're not registered or your email or password are wrong`,
      });
    }

    // The password is valid?
    const validPassword = bcrypt.compareSync(pass, userExists.pass);
    if (!validPassword) {
      return res.status(400).json({ msg: "Please, check your password" });
    }

    // All went good
    res.status(200).json({ msg: "Loggined" });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

module.exports = {
  login,
};
