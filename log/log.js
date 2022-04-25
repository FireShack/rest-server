const { writeFileSync } = require("fs");

const writeLog = (err) => {
  writeFileSync("log.txt", `${err.toString()} \n`, { flag: "a+" });
};

module.exports = writeLog;
