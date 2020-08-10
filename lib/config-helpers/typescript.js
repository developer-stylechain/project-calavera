const { writeFiles } = require("../fileUtils");

const typescriptConfigFiles = [
  "tsconfig.json",
  "typescript-node/tsconfig.json",
];
const typescriptDependencies = ["typescript", "@tsconfig/recommended"];
const typescriptNodeDependencies = ["typescript", "@tsconfig/node12"];

const typescriptTooling = {
  /**
   * Returns an array of tool dependencies
   * and writes the relevant config file to disk
   * @param {String} target - The TypeScript target. Passing nothing adds TypeScript
   * recommended(https://github.com/tsconfig/bases/#recommended-tsconfigjson). Passing
   * `node` as the target will add the recommended config for
   * Node 12(https://github.com/tsconfig/bases/#node-12-tsconfigjson)
   * @returns Array of strings of relevant dependencies
   */
  addTooling: (target) => {
    let configFiles = [typescriptConfigFiles[0]];
    let dependencies = typescriptDependencies;

    if (target === "node") {
      configFiles = [typescriptConfigFiles[1]];
      dependencies = typescriptNodeDependencies;
    }

    writeFiles(configFiles);
    return dependencies;
  },
};

module.exports = {
  typescriptConfigFiles,
  typescriptDependencies,
  typescriptNodeDependencies,
  typescriptTooling,
};
