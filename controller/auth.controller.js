const writeLog = require("../log/log");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const generateToken = require("../helpers/geneate.token");
const { googleVerify } = require("../helpers/validate.google");

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

    // Generate web token
    const token = await generateToken(userExists.id);

    // All went good
    res.status(200).json({ msg: "Loggined", token, userExists });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;
  const { name, email } = await googleVerify(id_token);
  try {
    // Check if user exists
    let googleUser = await userModel.findOne({ mail: email });

    // If not, it will be created
    if (!googleUser) {
      const data = {
        name,
        mail: email,
        pass: "non",
        role: "USER_ROLE",
        google: true,
      };
      // Create a new mongoose instance
      googleUser = new userModel(data);
      await googleUser.save();
    }

    // If the user exists, he's allowed to enter to my app?
    if (!googleUser.state) {
      return res.status(401).json({
        msg: "Your account has been blocked, please contact with support",
      });
    }

    // Generates the token
    const token = await generateToken(googleUser.id);

    res.status(200).json({ msg: "Login successfully", googleUser, token });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog(error);
  }
};

module.exports = {
  login,
  googleSignIn,
};
