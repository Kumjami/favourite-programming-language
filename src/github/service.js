"use strict";

var GitHubApi = require("github");
var githubConfig = require("../../config/github");

var github = new GitHubApi(githubConfig.service);
github.authenticate(githubConfig.auth);

/**
 * GitHub service instance
 * @type {module.exports|exports}
 */
module.exports = github;
