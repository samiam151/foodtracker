// Base URL: /api/food
const router = require("express").Router();
const path = require("path");
const FoodService = require("../services/foodApiService");
const Food = require("../models/food");
const FoodUserService = require("../services/foodUserService");

router.use((req, res, next) => {
    console.log(req.method);
    console.log(req.body);
    next();
});

router.post("/initFoods", (req, res) => {
    FoodUserService.getLog(req.body.user_id)
        .then(data => res.json(data));
});

router.post("/search", (req, res) => {
    let value = req.body.input;
    FoodService.findIngredient(value)
        .then(data => {
            console.log(data);
            let foodObjects = data.hints.map(food => new Food(food));
            res.json(foodObjects);
        })
});

module.exports = router;