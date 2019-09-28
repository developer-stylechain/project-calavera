#!/usr/bin/env node

/**
 * @fileoverview Main CLI that is run via the calavera command.
 * @author Schalk Neethling
 */

"use strict";

const { addDependency, addDependencies, complete } = require("./utils");
const cssTooling = require("./config-helpers/css");
const formatTooling = require("./config-helpers/format");
const { getConfig } = require("./config");
const { writeFile, writeFiles } = require("./fileUtils");

async function fillCatacomb() {
  const calaveraConfig = await getConfig();
  let dependecies = [];

  if (!calaveraConfig) {
    console.info(
      "No configuration found for calavera. Please add a config block in your package.json"
    );
    return;
  }

  for (let config in calaveraConfig) {
    switch (config) {
      case "stylelint":
        dependecies.concat(cssTooling.addStylelint());
        break;
      case "prettier":
        dependecies.concat(formatTooling.addPrettier());
        break;
      default:
        console.error(`No configuration or skeleton match found for ${config}`);
        break;
    }
  }

  // Log next steps information to the terminal.
  complete(calaveraConfig, dependecies);
}

fillCatacomb();
