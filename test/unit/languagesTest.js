"use strict";

var expect = require("chai").expect;
var languagesParser = require("../../src/languages");
var languagesFixtures = require("../fixtures/reposLanguagesFixtures");

describe("Languages parser test", function () {
    describe("Parse languages function", function () {
        it("Should sum all languages values and return a summary", function (done) {
            var languages = languagesParser.parseLanguages(languagesFixtures[0]);
            expect(languages).to.deep.equal(
                {
                    Python: 2469,
                    CoffeeScript: 3613,
                    Shell: 156,
                    Batchfile: 72,
                    JavaScript: 2993,
                    Ruby: 190769,
                    Cucumber: 16796,
                    HTML: 9450,
                    'Objective-C': 1742
                }
            );
            done();
        });
        it("Should return and empty object if there is no languages", function (done) {
            var languages = languagesParser.parseLanguages(languagesFixtures[1]);
            expect(languages).to.deep.equal({});
            done();
        });
    });
    describe("Get favourite language function", function () {
        it("Should return programming language with highest value", function (done) {
            var favouriteLanguage = languagesParser.getFavouriteLanguage(languagesFixtures[2]);
            expect(favouriteLanguage).to.be.equal("PHP");
            done();
        });
        it("Should return more than one if has the same value", function (done) {
            var favouriteLanguage = languagesParser.getFavouriteLanguage(languagesFixtures[3]);
            expect(favouriteLanguage).to.be.equal("Java,C,JavaScript,Golang");
            done();
        });
        it("Should return empty response if there are no languages", function (done) {
            var favouriteLanguage = languagesParser.getFavouriteLanguage(languagesFixtures[4]);
            expect(favouriteLanguage).to.be.equal("");
            done();
        });
    });
});