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
 * Load the relevant skeleton and return its file contents
 * @param {String} skeleton - Relative path to the skeleton in `SKELETON_CLOSET`
 * @returns the file contents
 */
function getFileContents(skeleton) {
  try {
    return fse.readFileSync(
      path.join(__dirname, SKELETON_CLOSET + skeleton),
      "utf-8"
    );
  } catch (error) {
    throw new Error(
      `Error reading ${skeleton} file contents: ${error.toString()}`
    );
  }
}

/**
 * Writes an Array of skeleton files to the root of the project
 * @param {Array} skeletons - The Array of skeleton filenames
 * @param {Object} [writeConfig] - An optional object with file write settings
 */
async function writeFiles(skeletons, writeConfig) {
  try {
    for (let skeleton of skeletons) {
      const isStylelintrc = skeleton.indexOf(".stylelintrc");
      const isESLintrc = skeleton.indexOf(".eslintrc");

      let fileContents = getFileContents(skeleton);

      if (writeConfig && writeConfig.withPrettier && isStylelintrc > -1) {
        fileContents = addPrettierToConfig(
          fileContents,
          "stylelint-prettier/recommended"
        );
      } else if (writeConfig && writeConfig.withPrettier && isESLintrc > -1) {
        fileContents = addPrettierToConfig(fileContents, "prettier");
      }
      // ensure we always write these files to the project root
      skeleton = skeleton.substr(skeleton.lastIndexOf("/") + 1);
      fse.outputFileSync("./" + skeleton, fileContents);
    }
  } catch (error) {
    signale.error(`Error in fileUtils: ${error.message}`);
  }
}

module.exports = {
  getFileContents,
  writeFiles,
};
