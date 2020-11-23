#!/usr/bin/env node

const inquirer = require("inquirer");
const program = require("commander");
const chalk = require("chalk");

//File function Import
const createReactFile = require('./utils/createReactFile');
const createNodeFile = require('./utils/createNodeFile');
const createNativeFile = require('./utils/createNativeFile');

// Process Variables
const process = require("process");
const path = process.cwd();
const fs = require("fs");

program
    .version("1.0.0")
    .description("A CLI to make customizable 'tsconfig.json' files easily");

function main() {
    inquirer
        .prompt([{
                type: "list",
                message: "Please select the framework that you are using:",
                name: "framework",
                choices: ["ReactJS", "React-Native", "NodeJS"],
            },
            {
                type: "confirm",
                message: "Do you want to customize your file",
                name: "custom",
                default: true,
            },
        ])
        .then((answers) => {
            switch (answers.framework) {
                case "React-Native":
                    createNativeFile(answers.custom);
                    break;
                case "ReactJS":
                    //* ReactJS is done!!!!!
                    createReactFile(answers.custom);
                    break;
                case "NodeJS":
                    createNodeFile(answers.custom);
                    break;
            }
        });
}

program
    .command("init")
    .description("Initialise a 'tsconfig.json' file")
    .action(() => {
        main();
    });

program.parse(process.argv);