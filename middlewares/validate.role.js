const writeLog = require("../log/log");

const validateAdmin = (req, res, next) => {
  try {
    const { name, mail, role } = req.userData;

    // Check user's role
    if (role !== "ADMIN_ROLE") {
      return res
        .status(400)
        .json({ msg: `Sorry ${name}, ${mail}, you can't delete other users` });
    }

    next();
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Something went wrong. Maybe your token has expired" });
    writeLog(error);
  }
};

const validateRole = (...roles) => {
  return (req, res, next) => {
    const { role } = req.userData;

    if (!roles.includes(role)) {
      return res.status(400).json({ msg: "You can't make this" });
    }

    next();
  };
};

module.exports = { validateAdmin, validateRole };
