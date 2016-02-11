"use strict";

var _ = require("lodash");

/**
 * Parse languages results to get a resume
 * @param {[object]} languages object arrays
 * @returns {object} key-value language use object
 */
var parseLanguages = function (languages) {
    var langs = {};
    languages.map(lg => _.forIn(lg[0], function (value, key) {
        if(typeof value == "number") {
            langs[key] = langs[key] || 0;
            langs[key] += value;
        }
    }));
    return langs;
};

/**
 * Given a key-value language object, returns the favourite programming
 * language as a string.
 * @param {object} languages key-value
 * @returns {string|*} favourite language name
 */
var getFavouriteLanguage = function (languages) {
    var maxValue = 0;
    var favLenguage = [""];
    _.forIn(languages, function (value, key) {
        if(value >= maxValue) {
            value==maxValue ? favLenguage.push(key) : favLenguage = [key];
            maxValue = value;
        }
    });
    return favLenguage.toString();
};

/**
 * Public interface
 * @type {{parseLanguages: parseLanguages, getFavouriteLanguage: getFavouriteLanguage}}
 */
module.exports = {
    parseLanguages,
    getFavouriteLanguage
};
