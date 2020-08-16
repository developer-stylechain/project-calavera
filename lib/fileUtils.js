"use strict";

const fse = require("fs-extra");
const path = require("path");
const signale = require("signale");

const SKELETON_CLOSET = "../closet/skeletons/";

/**
 * Adds an extends entry to config for Prettier
 * @param {String} fileContents - config file contents
 * @param {String} configEntry - The config entry to add to `extends`
 * @returns `fileContents` with Prettier config added
 */
function addPrettierToConfig(fileContents, configEntry) {
  const json = JSON.parse(fileContents);
  json.extends.push(configEntry);

  /*
   * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Parameters,
   * in particular the `space` parameter we use here to ensure the file content
   * formatting persists.
   */
  return JSON.stringify(json, null, 4);
}

/**
 * Updates the `configFileContents` with the provided `entries`
 * @param {String} configFileContents - The config file contents to update
 * @param {Array} entries - config entry or entries to add to config file
 * @returns updated config file contents as a string
 */
function updateConfig(configFileContents, entries) {
  const json = JSON.parse(configFileContents);
  // because `entries` is passed by reference,
  // we make a copy to avoid unexpected behavior
  let configEntries = [...entries];

  if (!json.extends) {
    json["extends"] = [];
  } else if (json.extends.includes("prettier")) {
    // prettier needs to be at the end of extends so,
    // if extends includes prettier, pop it now and
    // push it back onto the end.
    configEntries.push(json.extends.pop());
  }

  configEntries.forEach((entry) => {
    json.extends.push(entry);
  });

  return JSON.stringify(json, null, 2);
}

/**
 * Load the relevant file and return its file contents
 * @param {String} filePath - Relative path to the file
 * @returns the file contents
 */
function getFileContents(filePath) {
  try {
    return fse.readFileSync(filePath, "utf8");
  } catch (error) {
    throw new Error(
      `Error reading file contents of ${filePath}: ${error.toString()}`
    );
  }
}

/**
 * Writes an Array of skeleton files to the root of the project
 * @param {Array} skeletons - The Array of skeleton filenames
 * @param {Object} [writeConfig] - An optional object with file write settings
 */
function writeFiles(skeletons, writeConfig) {
  try {
    for (let skeleton of skeletons) {
      const isStylelintrc = skeleton.indexOf(".stylelintrc");
      const isESLintrc = skeleton.indexOf(".eslintrc");

      let fileContents = getFileContents(
        path.join(__dirname, SKELETON_CLOSET + skeleton)
      );

      if (writeConfig && writeConfig.withPrettier && isStylelintrc > -1) {
        fileContents = addPrettierToConfig(
          fileContents,
          "stylelint-prettier/recommended"
        );
      } else if (writeConfig && writeConfig.withPrettier && isESLintrc > -1) {
        fileContents = addPrettierToConfig(fileContents, "prettier");
      }
      skeleton = skeleton.substr(skeleton.lastIndexOf("/") + 1);
      // ensure we always write these files to the project root
      fse.outputFileSync(`./${skeleton}`, fileContents);
    }
  } catch (error) {
    signale.error(`Error in fileUtils: ${error.message}`);
  }
}

module.exports = {
  getFileContents,
  updateConfig,
  writeFiles,
};
