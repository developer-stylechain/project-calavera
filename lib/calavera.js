#!/usr/bin/env node

/**
 * @fileoverview Main CLI that is run via the calavera command.
 * @author Schalk Neethling
 */

'use strict';

const { addDependency, addDependencies, getNPMInstallCmd } = require('./utils');
const { getConfig } = require('./config');
const { writeFile, writeFiles } = require('./fileUtils');

const COMMON = [
    'CODE-OF-CONDUCT.md',
    '.eslintrc.js',
    '.prettierrc',
    '.sasslintrc',
    '.stylelintrc',
    '.stylelintignore'
];
const COMMON_JS = ['.babelrc', '.browserslistrc'];
const COMMON_DEPENDECIES = ['eslint', 'prettier', 'sass-lint', 'stylelint'];
const COMMON_JS_DEPENDECIES = ['babel-cli', 'babel-preset-env'];

async function fillCatacomb() {
    const calaveraConfig = await getConfig();
    let dependecies = [];

    if (!calaveraConfig) {
        console.info(
            'No configuration found for calavera. Please add a config block in your package.json'
        );
        return;
    }

    for (let config in calaveraConfig) {
        switch (config) {
            case 'all-contributors':
                writeFile('.all-contributorsrc');
                dependecies = addDependency(
                    'all-contributors-cli',
                    dependecies
                );
                break;
            case 'babeljs':
                writeFiles(COMMON_JS);
                dependecies = addDependencies(
                    COMMON_JS_DEPENDECIES,
                    dependecies
                );
                break;
            case 'code-of-conduct':
                writeFile('CODE-OF-CONDUCT.md');
                break;
            case 'contribute-json':
                writeFile('contribute.json');
                break;
            case 'common':
                writeFiles(COMMON);
                dependecies = addDependencies(COMMON_DEPENDECIES, dependecies);
                break;
            case 'commonjs':
                writeFiles(COMMON.concat(COMMON_JS));
                dependecies = addDependencies(
                    COMMON_DEPENDECIES.concat(COMMON_JS_DEPENDECIES),
                    dependecies
                );
                break;
            case 'prettier':
                writeFile('.prettierrc');
                dependecies = addDependency('prettier', dependecies);
                break;
            case 'eslint':
                writeFile('.eslintrc.js');
                dependecies = addDependency('eslint', dependecies);
                break;
            case 'readme':
                writeFile('README.md');
                break;
            case 'sass-lint':
                writeFile('.sasslintrc');
                dependecies = addDependency('sass-lint', dependecies);
                break;
            case 'stylelint':
                writeFiles(['.stylelintrc', '.stylelintignore']);
                dependecies = addDependency('stylelint', dependecies);
                break;
            default:
                console.error(
                    `No configuration or skeleton match found for ${config}`
                );
                break;
        }
    }

    console.info(
        'Run the following command to install dependencies: ',
        getNPMInstallCmd(dependecies)
    );
}

fillCatacomb();
