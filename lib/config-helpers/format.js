const { writeFile } = require("../fileUtils");

formatTooling = {
  addPrettier: async () => {
    await writeFile(".prettierrc");
    return ["prettier"];
  }
};

module.exports = formatTooling;
