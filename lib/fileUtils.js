"use strict";

const fse = require("fs-extra");
const path = require("path");
const signale = require("signale");

const SKELETON_CLOSET = "../closet/skeletons/";

/**
 * Writes an Array of skeleton files to the root of the project
 * @param {Array} skeletons - The Array of skeleton filenames
 */
async function writeFiles(skeletons) {
  try {
    for (let skeleton of skeletons) {
      const fileContents = await fse.readFile(
        path.join(__dirname, SKELETON_CLOSET + skeleton),
        "utf-8"
      );

      // issue and pr templates are written to a different directory
      if (
        skeleton === "ISSUE_TEMPLATE.md" ||
        skeleton === "PULL_REQUEST_TEMPLATE.md"
      ) {
        fse.outputFileSync("./.github/" + skeleton, fileContents);
      } else {
        // ensure we always write these files to the project root
        skeleton = skeleton.substr(skeleton.lastIndexOf("/") + 1);
        fse.outputFileSync("./" + skeleton, fileContents);
      }
    }
  } catch (error) {
    signale.error(`Error reading skeleton: ${error}`);
  }
}

module.exports = {
  writeFiles,
};
