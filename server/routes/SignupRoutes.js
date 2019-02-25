// Base URL: /api/signup
const router = require("express").Router();
const path = require("path");
const UserService = require("../services/userService");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "../../../views/signup/signup.html"));
});

router.post("/", (req, res) => {
    let username = req.body.username,
        password = req.body.password;

    UserService.createUser(username, password).then(newUser => {
        req.logIn(newUser, (err) => {
            res.redirect("/");
        });
    }).catch(err => console.log(err));
});

module.exports = router;