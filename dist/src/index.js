#!/usr/bin/env node

/*
 * Japroz Singh Saini
 * 24 Nov 2020
 * Tsgist
 */

const inquirer = require("inquirer");
const program = require("commander");
const chalk = require("chalk");
const fs = require("fs");
const os = require("os");

//File function Import
const createReactFile = require("./utils/createReactFile");
const createNodeFile = require("./utils/createNodeFile");
const createNativeFile = require("./utils/createNativeFile");
const createVueFile = require("./utils/createVueFile");
const createAngularFile = require("./utils/createAngularFile");

// Process Variables
const process = require("process");
const path = process.cwd();

// Variables
const rootDir = os.homedir();
const rootFolders = fs.readdirSync(rootDir, "utf-8");
if (fs.existsSync(`${rootDir}/tsgist`) == false) {
    fs.mkdirSync(`${rootDir}/tsgist`);
} else {
    const templatesFolder = fs.readdirSync(`${rootDir}/tsgist`);
}

program
    .version("1.2.0")
    .description("A CLI to make customizable 'tsconfig.json' files easily");

function loadFile(template) {
    if (!template.includes("json")) {
        file = `${template}.json`;
    } else {
        file = template;
    }
    if (fs.existsSync(`${rootDir}/tsgist/${file}`)) {
        const config = fs.readFileSync(`${rootDir}/tsgist/${file}`, 'utf-8');
        fs.writeFileSync("tsconfig.json", config, "utf-8");
    } else {
        console.log(chalk.red(
            `Could not find the template at : ${rootDir + "/tsgist/" + file}`
        ));
    }
}

function main() {
    inquirer
        .prompt([{
                type: "list",
                message: "Please select the framework that you are using:",
                name: "framework",
                choices: ["AngularJS", "ReactJS", "NodeJS", "VueJS", "React-Native"],
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
program
    .command("temp <template>")
    .description("Create and load your own templated config files")
    .action((template) => {
        loadFile(template);
    });

program.parse(process.argv);