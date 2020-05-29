const { writeFiles } = require("../fileUtils");

const prettierDependencies = ["prettier"];
const prettierConfigFiles = [".prettierrc"];

formatTooling = {
  addPrettier: async () => {
    await writeFiles(prettierConfigFiles);
    return prettierDependencies;
  },
};

module.exports = {
  prettierDependencies,
  prettierConfigFiles,
  formatTooling,
};
