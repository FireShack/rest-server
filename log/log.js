const { writeFileSync } = require("fs");

const writeLog = (err) => {
  writeFileSync("log.txt", `${err} \n`, { flag: "a+" });
};

module.exports = writeLog;
