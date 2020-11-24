/*
 * Japroz Singh Saini
 * 24 Nov 2020
 * Tsgist
 */
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const config = {
    "compilerOptions": {
        "outDir": "./built/",
        "sourceMap": true,
        "rootDir": "src",
        "strict": true,
        "noImplicitReturns": true,
        "noImplicitAny": true,
        "module": "es2015",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "moduleResolution": "node",
        "target": "ES5",
        "lib": ["ES2015", "DOM"]
    },
    "include": [
        "./client/**/*"
    ]
}

module.exports = function createVueFile(custom) {
        if (custom) {
            inquirer.prompt([{
                        type: "text",
                        message: "Config file location",
                        name: "location",
                        default: path.basename(process.cwd()),
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
                    },
                    {
                        type: 'list',
                        message: "Target : ",
                        name: 'target',
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
                    }, {
                        type: 'text',
                        message: 'Name of the file',
                        name: 'name',
                        default: 'tsconfig.json'
                    }
                ]).then((answers) => {
                        config.compilerOptions.lib = answers.lib;
                        config.compilerOptions.target = answers.target;
                        config.compilerOptions.strict = answers.strict;
                        config.compilerOptions.sourceMap = answers.sourceMap;
                        config.compilerOptions.rootDir = answers.src;
                        config.compilerOptions.outDir = answers.outDir;

                        const hasJson = answers.name.includes('.json')
                        if (answers.location == path.basename(process.cwd())) {
                            fs.writeFileSync(`/${path.join(process.cwd(),hasJson ? answers.name.split(' ').join('-') : `${answers.name.replace(' ', '-')}.json`)}`, JSON.stringify(config), 'utf-8');
            } else {
                fs.writeFileSync(`/${path.join(process.cwd(),answers.location,hasJson? answers.name.split(" ").join("-"): `${answers.name.replace(" ", "-")}.json`)}`, JSON.stringify(config), "utf-8");
            }
            console.log(chalk.green(`Generated the tsconfig.json file for VueJS`))
        })
    } else {
        const data = `{\n\t"compilerOptions": {\n\t\t"outDir": "./built/",\n\t\t"sourceMap": true,\n\t\t"rootDir": "src",\n\t\t"strict": true,\n\t\t"noImplicitReturns": true,\n\t\t"noImplicitAny": true,\n\t\t"module": "es2015",\n\t\t"experimentalDecorators": true,\n\t\t"emitDecoratorMetadata": true,\n\t\t"moduleResolution": "node",\n\t\t"target": "ES5",\n\t\t"lib": ["ES2015", "DOM"]\n\t},\n\t"include": [\n\t\t"./client/**/*"]\n}\n`
        fs.writeFileSync('tsconfig.json', data, 'utf-8');
        console.log(chalk.green(`Generated the tsconfig.json file for VueJS`))
    }
}