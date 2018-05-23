'use strict';

const fse = require('fs-extra');

const SKELETON_CLOSET = './closet/skeletons/';

async function writeFile(skeleton) {
    try {
        const fileContents = await fse.readFile(
            SKELETON_CLOSET + skeleton,
            'utf-8'
        );
        fse.outputFile('./' + skeleton, fileContents);
    } catch (error) {
        console.error(`Error reading skeleton: ${error}`);
    }
}

async function writeFiles(skeletons) {
    try {
        console.log('dirname', __dirname);
        for (let skeleton of skeletons) {
            console.log(
                'dirname',
                fse.realpathSync(SKELETON_CLOSET + skeleton)
            );
            console.dir('module', module);
            console.log('module.filename', module.filename);
            console.log('__dirname', __dirname);
            const fileContents = await fse.readFile(
                SKELETON_CLOSET + skeleton,
                'utf-8'
            );
            fse.outputFile('./' + skeleton, fileContents);
        }
    } catch (error) {
        console.error(`Error reading skeleton: ${error}`);
    }
}

module.exports = {
    writeFile,
    writeFiles
};
