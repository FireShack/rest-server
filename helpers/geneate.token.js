const JWT = require("jsonwebtoken");
const writeLog = require("../log/log");

const generateToken = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    JWT.sign(
      payload,
      process.env.PRIVATE_KEY,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          writeLog(err);
          return reject("There was an error, please try again");
        }
        resolve(token);
      }
    );
  });
};

module.exports = generateToken;
