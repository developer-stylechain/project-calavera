'use strict';

const {
    addDependency,
    addDependencies,
    getNPMInstallCmd
} = require('./lib/utils');
const { getConfig } = require('./lib/config');
const { writeFile, writeFiles } = require('./lib/fileUtils');

const COMMON = [
    'CODE-OF-CONDUCT.md',
    '.eslintrc.js',
    '.prettierrc',
    '.sasslintrc',
    '.stylelintrc',
    '.stylelintignore'
];
const COMMON_DEPENDECIES = ['eslint', 'prettier', 'sass-lint', 'stylelint'];

async function fillCatacomb() {
    const calaveraConfig = await getConfig();
    let dependecies = [];

    for (let config in calaveraConfig) {
        switch (config) {
            case 'all-contributors':
                writeFile('.all-contributorsrc');
                dependecies = addDependency(
                    'all-contributors-cli',
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
