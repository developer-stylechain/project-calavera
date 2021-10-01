const { writeFiles } = require("../fileUtils");

const editorconfigConfigFiles = [".editorconfig"];
const editorconfigDependencies = [];

const editorconfigConfig = {
  addConfig: () => {
    writeFiles(editorconfigConfigFiles);
    return editorconfigDependencies;
  },
};

module.exports = {
  editorconfigConfigFiles,
  editorconfigDependencies,
  editorconfigConfig,
};
