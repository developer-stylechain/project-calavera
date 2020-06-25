const { writeFiles } = require("../fileUtils");

const prettierConfigFiles = [".prettierrc"];
const prettierDependencies = ["prettier"];
const prettierWithESLintDependencies = prettierDependencies.concat([
  "eslint-config-prettier",
]);
const prettierWithStylelintDependencies = prettierDependencies.concat([
  "stylelint-config-prettier",
  "stylelint-prettier",
]);

formatTooling = {
  addPrettier: async () => {
    await writeFiles(prettierConfigFiles);
    return prettierDependencies;
  },
};

module.exports = {
  prettierConfigFiles,
  prettierDependencies,
  prettierWithESLintDependencies,
  prettierWithStylelintDependencies,
  formatTooling,
};
