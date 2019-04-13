// Base URL: /api/weight
const router = require("express").Router();
const path = require("path");
const WeightUserService = require("../services/weightUserService");

router.post("/add", (req, res) => {
    WeightUserService.addWeightEntry(
        req.body.userID,
        req.body.weight,
        req.body.entry_date
    ).then(data => res.json(data))
    .catch(err => res.json(err));
})

module.exports = router;