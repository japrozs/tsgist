# Tsgist

<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20">
<linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
</linearGradient>
<rect rx="3" width="100" height="20" fill="#555"/>
<rect rx="3" x="45" width="55" height="20" fill="#4c1"/>
<path fill="#4c1" d="M45 0h4v20h-4z"/>
<rect rx="3" width="100" height="20" fill="url(#a)"/>
<g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="24" y="15" fill="#010101" fill-opacity=".3">build</text>
    <text x="24" y="14">build</text>
    <text x="72" y="15" fill="#010101" fill-opacity=".3">passing</text>
    <text x="72" y="14">passing</text>
</g>
</svg><br>
Tsgist is a package to generate `tsconfig.json` file is an easy and customizable manner.To get started install `tsgist` through `npm` with the following command:

```bash
npm install -g tsgist
```

Or for a quick start, please use the command below:

```bash
npx tsgist init
```

## Template

You can use template `tsconfig.json` files for easy and custom config files.To get started, `tsgist` creates a folder called `tsgist` in the home directory of your computer.In that directory, create a `json` files with the name that you want the `alias` to be.For example, id your `json` file is called `config.json` then you can use the command:

```bash
tsgist temp config
```

where `config` is the name of the json file which you want to use.

To find the home directory of your system, use the following command:

```bash
$ node
Welcome to Node.js v12.18.2.
Type ".help" for more information.
> const os = require('os');
> os.homedir()
'/Users/Japroz'
```

## FUNDING

For funding, see the `FUNDING.YML` file in the `.github` folder or click the Sponsor button at the top of the page on [Github](https://github.com/Japroz-Saini/tsgist).

## CONTRIBUTING

For contributing, please see the `CONTRIBUTING.MD` file in the root directory of the project.
