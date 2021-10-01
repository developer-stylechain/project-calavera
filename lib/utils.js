"use strict";

const fse = require("fs-extra");
const path = require("path");
const signale = require("signale");

/**
 * Takes an Array of dependencies and returns the install command for
 * the specified package manager
 * @param {String} manager - The depenency manager - One of `yarn` or `npm`
 * @param {Array} dependencies - The array of dependencies that needs to be installed
 * @returns {String} For example: yarn add -D eslint stylelint
 */
function getInstallCmd(manager, dependencies) {
  const npmCmd = `npm i -D --save-exact ${dependencies.join(" ")}`;
  const yarnCmd = `yarn add -D ${dependencies.join(" ")}`;

  return manager === "yarn" ? yarnCmd : npmCmd;
}

/**
 * Called when Calavera has written all skeletons. Logs
 * next steps information to the terminal.
 * @param {String} manager - The depenency manager - One of `yarn` or `npm`
 * @param {Array} dependencies - The array of dependencies that needs to be installed
 */
function complete(manager, dependencies) {
  signale.success("[Calavera] Skeletons written to project successfully");

  if (dependencies.length) {
    const INSTALL_CMD = getInstallCmd(manager, dependencies);
    signale.info(
      `[Calavera] Run the following command to install dependencies: ${INSTALL_CMD}`
    );
  }
}

async function loadPackageJson() {
  try {
    const fileContents = await fse.readFile(
      path.join(__dirname, "package.json"),
      "utf8"
    );
  } catch (error) {
    signale.error(`Error reading package.json: ${error}`);
  }
}

module.exports = {
  complete,
};
