// Base URL: /api/food
const router = require("express").Router();
const path = require("path");
const FoodService = require("../services/foodApiService");
const FoodUserService = require("../services/foodUserService");
const Food = require("../models/food");
const NutrientResponse =  require("../models/nutrientResponse");

router.use((req, res, next) => {
    console.log(req.method);
    console.log(req.body);
    next();
});

router.post("/initFoods", (req, res) => {
    FoodUserService.getLog(req.body.user_id, req.body.date)
        .then(data => res.json(data));
});

router.post("/nutrients", (req, res) => {
    FoodService.getNutrients(req.body.food_id, req.body.measure_uri)
        .then(data => {
            let nutrientResponseObjects = new NutrientResponse(data);
            res.json(nutrientResponseObjects);
        });
});

router.post("/search", (req, res) => {
    let value = req.body.input;
    FoodService.findIngredient(value)
        .then(data => {
            let foodObjects = data.hints.map(food => new Food(food));
            res.json(foodObjects);
        })
});

module.exports = router;