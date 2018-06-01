#!/usr/bin/env node

/**
 * @fileoverview Main CLI that is run via the calavera command.
 * @author Schalk Neethling
 */

'use strict';

const { addDependency, addDependencies, complete } = require('./utils');
const { getConfig } = require('./config');
const { writeFile, writeFiles } = require('./fileUtils');

const COLAB = [
    '.all-contributorsrc',
    'CODE-OF-CONDUCT.md',
    'contribute.json',
    'ISSUE_TEMPLATE.md',
    'PULL_REQUEST_TEMPLATE.md'
];
const COMMON_WEB = [
    '.prettierrc',
    '.sasslintrc',
    '.stylelintrc',
    '.stylelintignore'
];
const COMMON_JS = ['.babelrc', '.browserslistrc', '.eslintrc.js'];
const COMMON_WEB_DEPENDECIES = ['prettier', 'sass-lint', 'stylelint'];
const COMMON_JS_DEPENDECIES = ['babel-cli', 'babel-preset-env', 'eslint'];

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
            case 'colab':
                writeFiles(COLAB);
                break;
            case 'contribute-json':
                writeFile('contribute.json');
                break;
            case 'common-web':
                writeFiles(COMMON_WEB);
                dependecies = addDependencies(
                    COMMON_WEB_DEPENDECIES,
                    dependecies
                );
                break;
            case 'commonjs':
                writeFiles(COMMON_JS);
                dependecies = addDependencies(
                    COMMON_JS_DEPENDECIES,
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

    // Log next steps information to the terminal.
    complete(calaveraConfig, dependecies);
}

fillCatacomb();
