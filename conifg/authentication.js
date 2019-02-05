const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserService = require("../server/services/userService");
const bcrypt = require("bcrypt");
const numSalts = 10;
let Auth = {};

Auth.init = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        console.log("---------------------------");
        console.log(`Route: ${req.path}`);
        if (req.isAuthenticated()) {
            console.log(`Logged in as ${req.user.name}...`);
        } else {
            console.log("Not logged in...");
        }
        next();
    });

    passport.serializeUser(function (user, done) {
        done(null, user.name);
    });

    passport.deserializeUser(function (name, done) {
        UserService.getUser(name)
        .then(user => {
                done(null, user)
            })
            .catch(err => {
                console.log(err);
                done(err)
            });
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            UserService.getUser(username)
                .then((user) => {
                    if (!user) {
                        return done(null, false);
                    }
                    Auth.verifyPassword(user, password).then(passwordsMatch => {
                        if (passwordsMatch) {
                            return done(null, user)
                        }
                        return done(null, false);
                    });
                })
                .catch(err => {
                    console.log(err);
                    return done(err);
                });
        }
    ));
};

module.exports = Auth;