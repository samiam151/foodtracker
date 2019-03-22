// Base URL: /api/login
const router = require("express").Router();
const passport = require("passport");
const path = require("path");

router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect(`/login/success?username=${req.user.name}`);
    } else {
        res.sendFile(path.join(__dirname + "../../../views/login/login.html"));
    }
});

router.use((req, res, next) => {
    // console.log(req.method);
    // console.log(req.body);
    // console.log(req.xhr);
    next();
});
router.post("/", passport.authenticate('local', 
    { 
        failureRedirect: '/login/error'
    }), (req, res) => {
    let user = Object.assign({}, req.user);
    delete user.password;
    let userObj = {
        user: {
            ...user
        },
        authenticated: true
    }

    console.log("loginroute", userObj);
    res.json(userObj);
});

router.get('/success', (req, res) => {
    res.send("Welcome " + req.query.username+"!!");
});

router.get('/error', (req, res) => {
    res.json({
        authenticated: false
    });
});

module.exports = router;