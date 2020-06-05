const { writeFiles } = require("../fileUtils");

const prettierConfigFiles = [".prettierrc"];
const prettierDependencies = ["prettier"];
const prettierWithStylelintDependencies = [
  "prettier",
  "stylelint-config-prettier",
  "stylelint-prettier",
];

formatTooling = {
  addPrettier: async () => {
    await writeFiles(prettierConfigFiles);
    return prettierDependencies;
  },
};

module.exports = {
  prettierConfigFiles,
  prettierDependencies,
  prettierWithStylelintDependencies,
  formatTooling,
};
