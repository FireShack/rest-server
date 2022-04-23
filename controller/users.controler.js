const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const fs = require("fs");

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
    res.status(400).json({ msg: `The arguments are incorrect: ${err}` });
    // This function writes a log file to save all the errors
    fs.writeFileSync("log.txt", `${err.toString()} \n`, { flag: "a+" });
  }
};

const handleDelete = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send("You must provide an ID for these request");
  }
  res.json({ status: 200, msg: "Hi from Delete controller" });
};
const handlePatch = (req, res) =>
  res.json({ status: 200, msg: "Hi from Patch controller" });

const handleDefault = (req, res) => res.send("404 | page not found");

module.exports = {
  handleGetAllUsers,
  handlePost,
  handlePatch,
  handleDelete,
  handleDefault,
};
