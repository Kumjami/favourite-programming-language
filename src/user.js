"use strict";

/**
 * Given a user and a data source interface, returns a promise with
 * user used programming languages.
 * @param {string} user name
 * @param {object} dataInterface implementing getUserRepos and getAllReposLanguages
 *                 promises returning functions
 * @returns {Promise.<{object}>} promise with the user programming languages
 */
var getUserLanguages = function (user, dataInterface) {
    return dataInterface.getUserRepos(user)
        .then(repos => dataInterface.getAllReposLanguages(user, repos));
};

/**
 * Public interface
 * @type {{getUserLanguages: getUserLanguages}}
 */
module.exports = {
    getUserLanguages
};