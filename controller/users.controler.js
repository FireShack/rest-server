const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { request } = require("express");
const writeLog = require("../log/log");

const handleGetAllUsers = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  // GET all the active users
  const qDB = { state: true };
  try {
    // Execute all the DB queries all in one, by this way, we prevent non-blocking code
    const [total, allUsers] = await Promise.all([
      User.countDocuments(qDB),
      User.find(qDB).limit(Number(limit)).skip(Number(from)),
    ]);

    res.status(200).json({ total, allUsers });
  } catch (err) {
    res.status(400).json({ msg: "There was en error, please try again", err });
    writeLog(err);
  }
};

const handlePost = async (req, res) => {
  // Post request data, this will be saved into the DB
  const { name, mail, pass, role } = req.body;

  // We declare the new instance, and then we send all the request data
  const user = new User({ name, mail, pass, role });

  try {
    // Password Encryptation
    const salt = bcrypt.genSaltSync();
    user.pass = bcrypt.hashSync(pass, salt);

    // Save user into the DB
    await user.save();

    // Server response
    res.status(200).json({ msg: `User added successfully` });
  } catch (err) {
    // Send error
    res.status(400).json({ msg: `The arguments are incorrect: ${err}` });
    // This function writes a log file to save all the errors
    writeLog(err);
  }
};

const handlePut = async (req = request, res) => {
  const { id } = req.params;
  // Parse the URL
  const ID = id.trim("\n");
  const { __id, pass, mail, google, ...userToUpdate } = req.body;

  try {
    if (pass) {
      // If the password is on the request, it will be modified
      const salt = bcrypt.genSaltSync();
      userToUpdate.pass = bcrypt.hashSync(pass, salt);
    }

    // Find the user into the DB and update with the request data
    const userUpd = await User.findByIdAndUpdate(ID, userToUpdate);
    res.status(200).json({ msg: `User ${ID} updated`, userUpd });
  } catch (err) {
    res
      .status(400)
      .json({ msg: "There was an error, please try again", err, ID });
    writeLog(err);
  }
};

const handleDelete = async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.userData;

  // const ID = id.trim("\n");
  try {
    // Check if the user was deleted
    const { state } = await User.findById(id);
    if (!state) {
      return res.status(400).json({ msg: `User ${id} was already deleted` });
    }

    // Update user state and change it to false (no active user)
    await User.findByIdAndUpdate(id, { state: false });
    res.status(200).json({ msg: `User ${id} deleted by ${name} with ${role}` });
  } catch (err) {
    res.status(400).json({ msg: "There was an error", err });
    writeLog(err);
  }
};

const handleDefault = (req, res) => res.send("404 | page not found");

module.exports = {
  handleGetAllUsers,
  handlePost,
  handlePut,
  handleDelete,
  handleDefault,
};
