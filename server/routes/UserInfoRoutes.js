// Base URL: /api/userinfo
const router = require("express").Router();
const UserInfoService = require("../services/userInfoService");

router.post("/weight", (req, res) => {
    UserInfoService.getWeightData(req.body.user_id)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
});

router.post("/goals/update", (req, res) => {
    console.log(req.body);
    UserInfoService.updateGoals(
        req.body.user_id,
        req.body.target_weight,
        req.body.target_weekly_loss
    )
    .then(data => {
        res.json(data);
    })
    .catch(err => res.json(err));
});

module.exports = router;