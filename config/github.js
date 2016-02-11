module.exports = {
    service: {
        version: "3.0.0",
        debug: false,
        protocol: "https",
        host: "api.github.com"
    },
    auth: {
        type: "oauth",
        key:  process.env.GITHUB_APP_KEY || "7c1b4658dcfe9ae2cf83",
        secret: process.env.GITHUB_APP_SECRET || "eb14e89ad358b6c24d79f29b0004f1cc31121ab0"
    }
};
