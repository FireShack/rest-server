const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { request } = require("express");
const { writeFileSync } = require("fs");
// Users container
let users = [];

const handleGetAllUsers = (req, res) => res.json({ status: 200, msg: users });

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
    users.push({ user });
    await user.save();

    // Server response
    res.status(200).json({ msg: `User added successfully` });
  } catch (err) {
    // Send error
    res.status(400).json({ msg: `The arguments are incorrect: ${err}` });
    // This function writes a log file to save all the errors
    writeFileSync("log.txt", `${err.toString()} \n`, { flag: "a+" });
  }
};

const handlePut = async (req = request, res) => {
  const { id } = req.params;
  const ID = id.trim("\n");

  const { pass, google, ...userToUpdate } = req.body;
  try {
    if (pass) {
      const salt = bcrypt.genSaltSync();
      userToUpdate.pass = bcrypt.hashSync(pass, salt);
    }
    const userUpd = await User.findByIdAndUpdate(ID, userToUpdate);
    res.status(200).json({ msg: `Do you want to update user ${ID}`, userUpd });
  } catch (err) {
    res.status(400).json({ msg: "There was an error:", err, ID });
  }
};

const handleDelete = (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("You must provide an ID for these request");
  }
  User.findByIdAndRemove(id);
  res.json({ status: 200, msg: "You deleted user", id });
};

const handleDefault = (req, res) => res.send("404 | page not found");

module.exports = {
  handleGetAllUsers,
  handlePost,
  handlePut,
  handleDelete,
  handleDefault,
};
