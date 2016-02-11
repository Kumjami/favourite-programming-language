"use strict";

var expect = require("chai").expect;

var user = require("../../src/user");

describe("GetUserLanguages function test ", function () {
    var dataInterfaceMock;
    before(function (done) {
        dataInterfaceMock = {
            getUserRepos: function (user) {
                return new Promise(function (resolve, reject) {
                   if(user == "user1")
                        return reject(400);
                    return resolve([]);
                });
            },
            getAllReposLanguages: function (user) {
                return new Promise(function (resolve, reject) {
                    if(user == "user2")
                        return reject(200);
                    return resolve([{},{}]);
                });
            }
        };
        done();
    });

    it("Should trigger promise catch if there is error getting user repos", function (done) {
        user.getUserLanguages("user1", dataInterfaceMock)
            .catch(err => {
                expect(err).to.be.equal(400);
                done();
            });
    });

    it("Should trigger promise catch if there is error getting repos languages", function (done) {
        user.getUserLanguages("user2", dataInterfaceMock)
            .catch(err => {
                expect(err).to.be.equal(200);
                done();
            });
    });

    it("Should resolve promise if there is no error", function (done) {
        user.getUserLanguages("user3", dataInterfaceMock)
            .then((result) => {
                expect(result.length).to.be.equal(2);
                done();
            });
    });

});
