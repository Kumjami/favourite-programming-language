"use strict";

var expect = require("chai").expect;
var sinon = require("sinon");

var githubInterface = require("../../../src/github/interface");
var githubService = require("../../../src/github/service");

describe("GitHub interface", function () {
   before(function (done) {
        sinon.stub(githubService.repos, "getFromUser", function (params, callback) {
            switch (params.user) {
                case "user1":
                    callback(true);
                    break;
                case "user2":
                    let res = params.page == 1 ? [{},{}] : [{}];
                    callback(null, res);
                    break;
                default:
                    callback(true);
            }
        });
       sinon.stub(githubService.repos, "getLanguages", function (params, callback) {
           switch (params.repo) {
               case "repo1":
                   callback(true);
                   break;
               case "repo2":
                   let res = params.page == 1 ? [{},{}] : [{}];
                   callback(null, res);
                   break;
               case "repo3":
                   let res2 = params.page < 3 ? [{},{}] : [{}];
                   callback(null, res2);
                   break;
               default:
                   callback(true);
           }
       });
       done();
   });
    describe("GetUserRepos function", function () {
        it("Should trigger promise catch if error", function (done) {
            githubInterface.getUserRepos("user1")
                .catch((err) => {
                    expect(err).not.to.be.null;
                    done();
                });
        });
        it("Should iterate if there is pagination", function (done) {
            githubInterface.getUserRepos("user2", 2)
                .then((res)=> {
                    expect(res.length).to.be.equal(3);
                    done();
                })
                .catch((err) => done(err));
        });
    });
    describe("GetAllReposLanguages function", function () {
        it("Should trigger promise catch if error", function (done) {
            githubInterface.getAllReposLanguages("user1", [{name: "repo1"}])
                .catch((err) => {
                    expect(err).not.to.be.null;
                    done();
                });
        });

        it("Should iterate through language if there is pagination", function (done) {
            githubInterface.getAllReposLanguages("user2", [{name: "repo2"}], 2)
                .then((res)=> {
                    expect(res.length).to.be.equal(1);
                    expect(res[0].length).to.be.equal(3);
                    done();
                })
                .catch((err) => done(err));
        });

        it("Should iterate through repos and languages if there is pagination", function (done) {
            githubInterface.getAllReposLanguages("user2", [{name: "repo2"},{name: "repo3"}], 2)
                .then((res)=> {
                    expect(res.length).to.be.equal(2);
                    expect(res[0].length).to.be.equal(3);
                    expect(res[1].length).to.be.equal(5);
                    done();
                })
                .catch((err) => done(err));
        });
    });
});
