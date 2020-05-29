const { writeFiles } = require("../fileUtils");

sassTooling = {
  addSassLint: () => {
    writeFiles(["sass/.stylelintrc", ".stylelintignore"]);
    return ["stylelint", "stylelint-scss", "stylelint-config-recommended-scss"];
  },
};

module.exports = sassTooling;
