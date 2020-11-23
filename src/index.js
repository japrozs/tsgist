#!/usr/bin/env node

const inquirer = require("inquirer");
const program = require("commander");
const chalk = require("chalk");

//File function Import
const createReactFile = require('./utils/createReactFile');
const createNodeFile = require('./utils/createNodeFile');
const createNativeFile = require('./utils/createNativeFile');
const createVueFile = require('./utils/createVueFile');
const createAngularFile = require('./utils/createAngularFile');

// Process Variables
const process = require("process");
const path = process.cwd();
const fs = require("fs");

program
    .version("1.1.6")
    .description("A CLI to make customizable 'tsconfig.json' files easily");

function main() {
    inquirer
        .prompt([{
                type: "list",
                message: "Please select the framework that you are using:",
                name: "framework",
                choices: ["AngularJS", "ReactJS", "NodeJS", "VueJS", "React-Native", ],
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
                case "VueJS":
                    createVueFile(answers.custom);
                    break;
                case "AngularJS":
                    createAngularFile(answers.custom);
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
