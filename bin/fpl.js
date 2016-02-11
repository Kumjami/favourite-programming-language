#!/usr/bin/env node


"use strict";

if(process.argv.length < 3) {
    console.error("\n\tERROR: MISSING USERNAME\n\n" +
        "Please, insert a GitHub username.\nExamples:" +
        "\n\n\tfpl Kumjami" +
        "\n\tfpl sequelize\n\n");
    process.exit();
}

var githubUser = process.argv[2];
if(githubUser == "--help") {
    console.log("\nGet user favourite GitHub programming language.\n\n" +
        "\tcommand \<username\>\n\n");
    process.exit();
}

var user = require("../src/user");
var parser = require("../src/languages");
var gitHubInterface = require("../src/github/interface");

user.getUserLanguages(githubUser, gitHubInterface)
    .catch(() => {
        console.error(`\n\n\t\t${githubUser} user doesn't exists. Please check if there is a typo error\n\n`);
        process.exit();
    })
    .then(languages => parser.parseLanguages(languages))
    .then(rank => parser.getFavouriteLanguage(rank))
    .then(favourite => {
        console.log(`\n\n\t\t${githubUser} favourite language seems to be ${favourite || "none :( "}\n\n`);
        process.exit("by");
    }).catch(() => {console.log("Unexpected error"); process.exit();});
