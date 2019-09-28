const { writeFile } = require("../fileUtils");

formatTooling = {
  addPrettier: () => {
    writeFile(".prettierrc");
    return ["prettier"];
  }
};

module.exports = formatTooling;
