// Base URL: /api/workouts
const router = require("express").Router();
const path = require("path");
const WorkoutUserService = require("../services/workoutUserService");
const moment = require("moment");

router.post("/add", (req, res) => {
    let date = req.body.entry_date ? req.body.entry_date : moment().format("YYYY-MM-DD");

    WorkoutUserService.addWorkoutEntry(
        req.body.user_id,
        req.body.calories_burned,
        date
    ).then(data => res.json(data))
    .catch(err => res.json(err));
})

module.exports = router;