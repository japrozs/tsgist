const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const config = {
    "compileOnSave": false,
    "compilerOptions": {
        "rootDir": "src",
        "baseUrl": "./",
        "outDir": "./dist/out-tsc",
        "sourceMap": true,
        "declaration": false,
        "downlevelIteration": true,
        "experimentalDecorators": true,
        "moduleResolution": "node",
        "importHelpers": true,
        "strict": true,
        "target": "es2015",
        "module": "es2020",
        "lib": [
            "es2018",
            "dom"
        ]
    }
}

module.exports = function createAngularFile(custom) {
        if (custom) {
            inquirer.prompt([{
                        type: "text",
                        message: "Config file location",
                        name: "location",
                        default: path.basename(process.cwd()),
                    }, {
                        type: 'confirm',
                        message: "Compile on Save : ",
                        name: 'compileOnSave',
                        default: true
                    }, {
                        type: 'text',
                        message: "Main directory : ",
                        name: "src",
                        default: "src"
                    },
                    {
                        type: "text",
                        message: "Output directory : ",
                        name: "outDir",
                        default: "build/dist",
                    }, {
                        type: 'list',
                        message: "Target : ",
                        name: 'target',
                        choices: [
                            "ES3", "ES5", "ES6", "ES2015", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ESNext"
                        ]
                    }, {
                        type: 'list',
                        message: "Module : ",
                        name: 'module',
                        choices: [
                            "ES3", "ES5", "ES6", "ES2015", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ESNext"
                        ]
                    }, {
                        type: 'checkbox',
                        message: "Libraries : ",
                        name: "lib",
                        choices: ['DOM.Iterable',
                            'ES2015.Core',
                            'ES2015.Collection',
                            'ES2015.Generator',
                            'ES2015.Iterable',
                            'ES2015.Promise',
                            'ES2015.Proxy',
                            'ES2015.Reflect',
                            'ES2015.Symbol',
                            'ES2015.Symbol.WellKnown',
                            'ES2016.Array.Include',
                            'ES2017.object',
                            'ES2017.Intl',
                            'ES2017.SharedMemory',
                            'ES2017.String',
                            'ES2017.TypedArrays',
                            'ES2018.Intl',
                            'ES2018.Promise',
                            'ES2018.RegExp',
                            'ES2019.Array',
                            'ES2019.Full',
                            'ES2019.Object',
                            'ES2019.String',
                            'ES2019.Symbol',
                            'ES2020.Full',
                            'ES2020.String',
                            'ES2020.Symbol.wellknown',
                            'ESNext.AsyncIterable',
                            'ESNext.Array',
                            'ESNext.Intl',
                            'ESNext.Symbol`'
                        ]
                    }, {
                        type: 'confirm',
                        message: 'Use strict ?',
                        name: 'strict',
                        default: true
                    }, {
                        type: 'confirm',
                        message: "sourceMap ?",
                        name: 'sourceMap',
                        default: true
                    },
                    {
                        type: "text",
                        message: "What do you want to name the file?",
                        name: "name",
                        default: "tsconfig.json",
                    },
                ]).then((answers) => {
                        config.compileOnSave = answers.compileOnSave;
                        config.compilerOptions.strict = answers.strict;
                        config.compilerOptions.lib = answers.lib;
                        config.compilerOptions.target = answers.target;
                        config.compilerOptions.sourceMap = answers.sourceMap;
                        config.compilerOptions.module = answers.module;
                        config.compilerOptions.rootDir = answers.src;
                        config.compilerOptions.outDir = answers.outDir;

                        const hasJson = answers.name.includes('.json')
                        if (answers.location == path.basename(process.cwd())) {
                            fs.writeFileSync(`/${path.join(process.cwd(),hasJson ? answers.name.split(' ').join('-') : `${answers.name.replace(' ', '-')}.json`)}`, JSON.stringify(config), 'utf-8');
            } else {
                fs.writeFileSync(`/${path.join(process.cwd(),answers.location,hasJson? answers.name.split(" ").join("-"): `${answers.name.replace(" ", "-")}.json`)}`, JSON.stringify(config), "utf-8");
            }
            console.log(chalk.cyan(`Generated the tsconfig.json file for AngularJS`))
        })
    } else {
        const data = `{\n\t"compileOnSave": false,\n\t"compilerOptions": {\n\t\t"baseUrl": "./",\n\t\t"outDir": "./dist/out-tsc",\n\t\t"sourceMap": true,\n\t\t"declaration": false,\n\t\t"downlevelIteration": true,\n\t\t"experimentalDecorators": true,\n\t\t"moduleResolution": "node",\n\t\t"importHelpers": true,\n\t\t"strict": true,\n\t\t"target": "es2015",\n\t\t"module": "es2020",\n\t\t"lib": ["es2018","dom"]\n\t}\n}\n`
        fs.writeFileSync('tsconfig.json', data, 'utf-8');
        console.log(chalk.cyan(`Generated the tsconfig.json file for AngularJS`))
    }
}