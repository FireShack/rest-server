const path = require("path");
const writeLog = require("../log/log");

const handleGetFiles = (req, res) => {
  try {
    res.status(200).json({ msg: "This is are all the files" });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog();
  }
};

const handlePostFiles = (req, res) => {
  const { file } = req.files;
  try {
    if (!req.files) {
      return res
        .status(400)
        .json({ msg: "You must provide at least one file" });
    }
    const uploadPath = path.join(__dirname, "../uploads/", file.name);

    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(400).json({ msg: "There was an error", err });
      }
      res.status(200).json({ msg: "File added successfully", file });
    });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog();
  }
};

const handlePutFiles = (req, res) => {
  const { id } = req.params;

  try {
    res.status(200).json({ msg: `File ${id} modified successfully` });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog();
  }
};

const handleDeleteFiles = (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).json({ msg: `File ${id} deleted successfully` });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog();
  }
};

module.exports = {
  handleGetFiles,
  handlePostFiles,
  handlePutFiles,
  handleDeleteFiles,
};
