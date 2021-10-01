const { writeFiles } = require("../fileUtils");

const prettierConfigFiles = [".prettierrc.json", ".prettierignore"];
const prettierDependencies = ["prettier"];
const prettierWithStylelintDependencies = prettierDependencies.concat([
  "stylelint-config-prettier",
  "stylelint-prettier",
]);

const formatTooling = {
  addPrettier: () => {
    writeFiles(prettierConfigFiles);
    return prettierDependencies;
  },
};

module.exports = {
  prettierConfigFiles,
  prettierDependencies,
  prettierWithStylelintDependencies,
  formatTooling,
};
