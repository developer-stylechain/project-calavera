'use strict';

const { addDependency, getNPMInstallCmd } = require('./lib/utils');
const { getConfig } = require('./lib/config');
const { writeFile } = require('./lib/fileUtils');

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
            case 'prettier':
                writeFile('.prettierrc');
                dependecies = addDependency('prettier', dependecies);
                break;
            case 'eslint':
                writeFile('.eslintrc');
                dependecies = addDependency('eslint', dependecies);
                break;
            case 'stylelint':
                writeFile('.stylelintrc');
                writeFile('.stylelintignore');
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
