const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const config = {
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "lib": ["dom", "es6", "es2017", "esnext.asynciterable"],
        "skipLibCheck": true,
        "sourceMap": true,
        "outDir": "./dist",
        "rootDir": "src",
        "moduleResolution": "node",
        "removeComments": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "strict": false,
        "strictFunctionTypes": true,
        "noImplicitThis": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "resolveJsonModule": true,
        "baseUrl": "."
    },
    "exclude": ["node_modules"],
    "include": ["./src/**/*.tsx", "./src/**/*.ts"]
}

module.exports = function createNodeFile(custom) {
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
                }, {
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
                    message: "SkipLibCheck ?",
                    name: 'libcheck',
                    default: true
                }, {
                    type: 'text',
                    message: 'Name of the file',
                    name: 'name',
                    default: 'tsconfig.json'
                }]).then((answers) => {
                        config.compilerOptions.strict = answers.strict;
                        config.compilerOptions.skipLibCheck = answers.libcheck;
                        config.compilerOptions.lib = answers.lib;
                        config.compilerOptions.target = answers.target;
                        config.compilerOptions.outDir = answers.outDir;
                        config.compilerOptions.rootDir = answers.src;

                        const hasJson = answers.name.includes('.json')
                        if (answers.location == path.basename(process.cwd())) {
                            fs.writeFileSync(`/${path.join(process.cwd(),hasJson ? answers.name.split(' ').join('-') : `${answers.name.replace(' ', '-')}.json`)}`, JSON.stringify(config), 'utf-8');
            } else {
                fs.writeFileSync(`/${path.join(process.cwd(),answers.location,hasJson? answers.name.split(" ").join("-"): `${answers.name.replace(" ", "-")}.json`)}`, JSON.stringify(config), "utf-8");
            }
        })
    } else {
        const data = `{\n\t"compilerOptions": {\n\t\t"target": "es5",\n\t\t"module": "commonjs",\n\t\t"jsx": "react-native",\n\t\t"lib": ["es6", "esnext.asynciterable"],\n\t\t"strict": true,\n\t\t"esModuleInterop": true,\n\t\t"rootDir": "src",\n\t\t"forceConsistentCasingInFileNames": true,\n\t\t"noImplicitReturns": true,\n\t\t"noImplicitThis": true,\n\t\t"noImplicitAny": true,\n\t\t"strictNullChecks": true,\n\t\t"suppressImplicitAnyIndexErrors": true,\n\t\t"noUnusedLocals": true,\n\t\t"skipLibCheck": true,\n\t\t"baseUrl": "."\n\t}\n}\n`;
        fs.writeFileSync('tsconfig.json', data, 'utf-8');
    }
}