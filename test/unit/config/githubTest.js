"use strict";

var expect = require("chai").expect;
var rewire = require("rewire");
var gitHubConfig = require("../../../config/github");

describe("GitHub config file", function () {
    it("Should have well formed service configuration object", function (done) {
        let service = gitHubConfig.service;
        expect(service).to.contain.all.keys(["version", "debug", "protocol", "host"]);
        expect(service.debug).to.be.boolean;
        expect(service.version).to.be.string;
        expect(service.protocol).to.be.equal("https");
        expect(service.host).to.be.equal("api.github.com");
        done();
    });

    it("Should have a well formed auth configuration object", function (done) {
        let auth = gitHubConfig.auth;
        expect(auth).to.contain.all.keys(["type", "key", "secret"]);
        expect(auth.type).to.be.string;
        expect(auth.key).to.be.string;
        expect(auth.secret).to.be.string;
        done();
    });

    it("Should read env vars if exists", function (done) {
        process.env.GITHUB_APP_KEY="KEY";
        process.env.GITHUB_APP_SECRET="SECRET";

        var gitHubRewired = rewire("../../../config/github");
        let auth = gitHubRewired.auth;
        expect(auth).to.contain.all.keys(["type", "key", "secret"]);
        expect(auth.type).to.be.string;
        expect(auth.key).to.be.equal("KEY");
        expect(auth.secret).to.be.equal("SECRET");
        done();
    });

});
