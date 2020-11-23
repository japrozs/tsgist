const inquirer = require("inquirer");
const chalk = require('chalk')
const path = require("path");
const process = require("process");
const { combineFlagAndOptionalValue } = require("commander");
const fs = require("fs");

//TODO : Remove the comments in the config given below
// * The config below doesn't show comments when written into another
// * file with UTF-8 encoding
const config = {
    compilerOptions: {
        baseUrl: ".",
        // "outDir": "build/dist",
        module: "esnext",
        target: "es5",
        // "lib": ["es6", "dom", "esnext.asynciterable"],
        sourceMap: true,
        allowJs: true,
        jsx: "react",
        moduleResolution: "node",
        // "rootDir": "src",
        forceConsistentCasingInFileNames: true,
        noImplicitReturns: true,
        noImplicitThis: true,
        noImplicitAny: true,
        strictNullChecks: true,
        suppressImplicitAnyIndexErrors: true,
        noUnusedLocals: true,
        skipLibCheck: true,
    },
    exclude: [
        "node_modules",
        "build",
        "scripts",
        "acceptance-tests",
        "webpack",
        "jest",
        "src/setupTests.ts",
    ],
};

module.exports = function createReactFile(custom) {
        if (custom) {
            inquirer
                .prompt([{
                        type: "text",
                        message: "Config file location",
                        name: "location",
                        default: path.basename(process.cwd()),
                    },
                    {
                        type: "text",
                        message: "Main directory : ",
                        name: "src",
                        default: "src",
                    },
                    {
                        type: "text",
                        message: "Output directory : ",
                        name: "outDir",
                        default: "build/dist",
                    },
                    //TODO : Provide Autocompletion in searching for libraries
                    {
                        type: "checkbox",
                        message: "Libraries : ",
                        name: "lib",
                        choices: [
                            "DOM.Iterable",
                            "ES2015.Core",
                            "ES2015.Collection",
                            "ES2015.Generator",
                            "ES2015.Iterable",
                            "ES2015.Promise",
                            "ES2015.Proxy",
                            "ES2015.Reflect",
                            "ES2015.Symbol",
                            "ES2015.Symbol.WellKnown",
                            "ES2016.Array.Include",
                            "ES2017.object",
                            "ES2017.Intl",
                            "ES2017.SharedMemory",
                            "ES2017.String",
                            "ES2017.TypedArrays",
                            "ES2018.Intl",
                            "ES2018.Promise",
                            "ES2018.RegExp",
                            "ES2019.Array",
                            "ES2019.Full",
                            "ES2019.Object",
                            "ES2019.String",
                            "ES2019.Symbol",
                            "ES2020.Full",
                            "ES2020.String",
                            "ES2020.Symbol.wellknown",
                            "ESNext.AsyncIterable",
                            "ESNext.Array",
                            "ESNext.Intl",
                            "ESNext.Symbol`",
                        ],
                    },
                    {
                        type: "text",
                        message: "Which folders to exclude (seperated by commas) : ",
                        name: "exclude",
                        default: "node_modules,build,scripts,acceptance-tests,webpack,jest,src/setupTests.ts",
                    },
                    {
                        type: "text",
                        message: "What do you want to name the file?",
                        name: "name",
                        default: "tsconfig.json",
                    },
                ])
                .then((answers) => {
                        config.compilerOptions.outDir = answers.outDir;
                        config.compilerOptions.rootDir = answers.src;
                        config.compilerOptions.lib = answers.lib;
                        config.exclude.concat(answers.exclude);

                        const hasJson = answers.name.includes(".json");
                        if (answers.location == path.basename(process.cwd())) {
                            fs.writeFileSync(
                                `${
              hasJson
                ? answers.name.split(" ").join("-")
                : answers.name.split(" ").join("-") + ".json"
            }`,
                                JSON.stringify(config),
                                "utf-8"
                            );
                        } else {
                            fs.writeFileSync(
                                    `/${path.join(
              process.cwd(),
              answers.location,
              hasJson
                ? answers.name.split(" ").join("-")
                : `${answers.name.replace(" ", "-")}.json`
            )}`,
            JSON.stringify(config),
            "utf-8"
          );
        }
        console.log(chalk.cyan(`Generated the ${answers.name.split(" ").join("-")}.json file`))
      });
  } else {
    const config = `{\n\t"compilerOptions": {\n\t\t"baseUrl": ".",\n\t\t"outDir": "build/dist",\n\t\t"module": "esnext",\n\t\t"target": "es5",\n\t\t"lib": ["es6", "dom", "esnext.asynciterable"],\n\t\t"sourceMap": true,\n\t\t"allowJs": true,\n\t\t"jsx": "react",\n\t\t"moduleResolution": "node",\n\t\t"rootDir": "src",\n\t\t"forceConsistentCasingInFileNames": true,\n\t\t"noImplicitReturns": true,\n\t\t"noImplicitThis": true,\n\t\t"noImplicitAny": true,\n\t\t"strictNullChecks": true,\n\t\t"suppressImplicitAnyIndexErrors": true,\n\t\t"noUnusedLocals": true,\n\t\t"skipLibCheck": true\n\t},\n\t"exclude": [\n\t\t"node_modules",\n\t\t"build",\n\t\t"scripts",\n\t\t"acceptance-tests",\n\t\t"webpack",\n\t\t"jest",\n\t\t"src/setupTests.ts"\n\t]\n}\n`;
    fs.writeFileSync("tsconfig.json", config, "utf-8");
    console.log(chalk.cyan(`Generated the tsconfig.json file`))
  }
};