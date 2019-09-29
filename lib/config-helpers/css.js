const { writeFiles } = require("../fileUtils");

cssTooling = {
  addStylelint: () => {
    writeFiles([".stylelintrc", ".stylelintignore"]);
    return ["stylelint", "stylelint-config-recommended"];
  },
  addSassLint: () => {
    writeFiles(["sass/.stylelintrc", ".stylelintignore"]);
    return ["stylelint", "stylelint-scss", "stylelint-config-recommended-scss"];
  }
};

module.exports = cssTooling;
