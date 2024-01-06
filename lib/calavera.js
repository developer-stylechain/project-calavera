#!/usr/bin/env node

/**
 * @fileoverview Main CLI that is run via the calavera command.
 * @author Schalk Neethling
 */

const inquirer = require("inquirer");
const { fillCatacomb } = require("./fill-catacomb");

inquirer
  .prompt([
    {
      type: "checkbox",
      message: "Select linters and style checkers",
      name: "skeletons",
      choices: [
        {
          name: "Stylelint",
        },
        {
          name: "ESLint",
        },
      ],
      validate(skeletons) {
        if (skeletons.length < 1) {
          return "You must choose at least one linter or style checker.";
        }

        return true;
      },
    },
    {
      type: "checkbox",
      message: "Select package manager",
      name: "packageManager",
      choices: [
        {
          name: "npm",
        },
        {
          name: "yarn",
        },
      ],
      validate(manager) {
        if (manager.length < 1) {
          return "You must choose one package manager.";
        }

        return true;
      },
    },
  ])
  .then((skeletons, packageManager) => {
    console.log(JSON.stringify(skeletons, null, "  "));
    console.log(JSON.stringify(packageManager, null, "  "));
    fillCatacomb(skeletons, packageManager);
  });
