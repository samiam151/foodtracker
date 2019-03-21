// Base URL: /api/signup
const router = require("express").Router();
const path = require("path");
const UserService = require("../services/userService");

router.post("/", (req, res) => {
    let username = req.body.username,
        password = req.body.password,
        birthday = req.body.birthday,
        weight = req.body.weight,
        height = req.body.height,
        activityLevel = req.body.activityLevel,
        gender = req.body.gender;

    UserService.createUser(username, password, birthday, weight, height, activityLevel, gender).then(newUser => {
        req.logIn(newUser, (err) => {
            if (err) {
                console.log(err);
                res.json(err);
            }
            res.json(newUser);
        });
    }).catch(err => {
        console.log(err);
        res.json(err);
    });
});


router.get("/names", (req, res) => {
    UserService.getUserNames()
        .catch(err => res.json(err))
        .then(data => res.json(data));
});


module.exports = router;