// Base URL: /api/signup
const router = require("express").Router();
const path = require("path");
const UserService = require("../services/userService");

router.post("/", (req, res) => {
    let username = req.body.username,
        password = req.body.password,
        birthday = req.body.birthday;

    UserService.createUser(username, password, birthday).then(newUser => {
        req.logIn(newUser, (err) => {
            res.json(newUser);
        });
    }).catch(err => console.log(err));
});

module.exports = router;