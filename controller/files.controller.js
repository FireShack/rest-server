const validateUpload = require("../helpers/validate.upload");
const writeLog = require("../log/log");

const handleGetFiles = (req, res) => {
  try {
    res.status(200).json({ msg: "This is are all the files" });
  } catch (error) {
    res.status(400).json({ msg: "There was an error", error });
    writeLog();
  }
};

const handlePostFiles = async (req, res) => {
  const { file } = req.files;
  try {
    if (!req.files) {
      return res
        .status(400)
        .json({ msg: "You must provide at least one file" });
    }
    await validateUpload(file);

    res.status(200).json({ msg: "File loaded successfully", file });
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
