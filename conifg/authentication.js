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
            console.log("Passport User: ", req.session.passport.user);
        } else {
            console.log("Not logged in...");
        }
        console.log("---------------------------");
        next();
    });

    passport.serializeUser(function (user, done) {
        done(null, {
            name: user.name,
            id: user.id
        });
    });

    passport.deserializeUser(function (_user, done) {
        UserService.getUserandGoals(_user.name)
            .then(user => {
                done(null, {
                    name: user.name,
                    id: user.id
                });
            })
            .catch(err => {
                console.log(err);
                done(err)
            });
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            UserService.getUserandGoals(decodeURIComponent(username))
                .then((user) => {
                    if (!username) {
                        console.log("No username given");
                        return done(null, false);
                    }
                    if (!password) {
                        console.log("No password given");
                        return done(null, false);
                    }
                    if (!user) {
                        console.log("User not found");
                        return done(null, false);
                    }
                    UserService.verifyPassword(user, password).then(passwordsMatch => {
                        if (passwordsMatch) {
                            return done(null, user);
                        }
                        console.log("Incorrect password");
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