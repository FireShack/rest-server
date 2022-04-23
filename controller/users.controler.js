// Users container
let users = [];

const handleGetAllUsers = (req, res) => res.json({ status: 200, msg: users });

const handlePost = (req, res) => {
  const { username, age } = req.body;
  try {
    if (!username || !age) {
      res.status(400).send("Please, complete the required data");
    }
    users.push({username, age });
    res.json({ status: 200, msg: `User added successfully` });
  } catch (err) {
    res.json({ status: 400, msg: `The arguments are incorrect: ${err}` });
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
