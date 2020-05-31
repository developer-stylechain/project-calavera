const { writeFiles } = require("../fileUtils");

const prettierConfigFiles = [".prettierrc"];
const prettierDependencies = ["prettier"];

formatTooling = {
  addPrettier: async () => {
    await writeFiles(prettierConfigFiles);
    return prettierDependencies;
  },
};

module.exports = {
  prettierConfigFiles,
  prettierDependencies,
  formatTooling,
};
