const uniqid = require("uniqid");
const path = require("path");

const validateUpload = (
  file,
  validExt = ["jpg", "png", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const shortName = file.name.split(".");
    const ext = shortName[shortName.length - 1];

    if (!validExt.includes(ext)) {
      return reject(`The ${ext} extension is not valid`, validExt);
    }

    const tempName = `${uniqid()}.${ext}`;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject("There was an error", err);
      }
      resolve("File added successfully", file);
    });
  });
};

module.exports = validateUpload;
