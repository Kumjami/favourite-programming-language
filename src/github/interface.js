"use strict";

var githubService = require("./service");
const PER_PAGE = 100;

/**
 * Given a username, get all repositories
 * @param {string} user name
 * @param {int} per_page query limit
 * @param {int} page pagination number
 * @param {[object]} prevRes previous recursive iteration results
 * @returns {Promise<[object]>} repos objects array
 */
var getUserRepos = function (user, per_page, page, prevRes) {
    page = page || 1;
    var limit = per_page || PER_PAGE;
    var results = prevRes || [];
    return new Promise(function (resolve, reject) {
        githubService.repos.getFromUser({user: user, page: page, per_page: limit}, function (err, res) {
            if (err) {
                return reject(err);
            }
            results = results.concat(res);
            if (res.length == limit) {
                getUserRepos(user, limit, page + 1, results).then(res => resolve(res));
            } else {
                return resolve(results);
            }
        });
    });
};

/**
 * Get all repo languages
 * @param {object} repo object
 * @param {string} user name
 * @param {int} per_page query limit
 * @param {int} page number pagination
 * @param {[object]} prevRes previous recursive iteration results
 * @returns {Promise<[object]>} repo languages objects array
 */
var getRepoLanguages = function (repo, user, per_page, page, prevRes) {
    page = page || 1;
    var limit = per_page;
    var results = prevRes || [];
    return new Promise(function (resolve, reject) {
        githubService.repos.getLanguages({user: user, repo: repo, page: page, per_page: limit}, function (err, res) {
            if (err) {
                return reject(err);
            }
            results = results.concat(res);
            if (res.length == limit) {
                getRepoLanguages(repo, user, limit, page + 1, results).then(res => resolve(res));
            } else {
                return resolve(results);
            }
        });
    });
};

/**
 * Get all user repos programming languages
 * @param {string} user name
 * @param {[object]} repos objects array
 * @param {int} per_page query limit
 * @returns {Promise<[object]>} all repos languages objects array
 */
var getAllReposLanguages = function (user, repos, per_page) {
    var limit = per_page || PER_PAGE;
    return Promise.all(repos.map(function (repo) {
        return getRepoLanguages(repo.name, user, limit);
    }));
};

/**
 * Public interface
 * @type {{getUserRepos: getUserRepos, getAllReposLanguages: getAllReposLanguages}}
 */
module.exports = {
    getUserRepos,
    getAllReposLanguages
};

