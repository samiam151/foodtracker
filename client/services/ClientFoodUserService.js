const ClientFoodUserService = {};

ClientFoodUserService.getUsersMeals = (user_id, date) => {
    return fetch("/api/food/initFoods", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            user_id: user_id,
            date: date
        })
    })
    .then(res => res.json())
    .then(res => {
        return res.reduce((obj, foodEntry) => {
            if (!obj[foodEntry["meal_name"]]) {
                obj[foodEntry["meal_name"]] = [];
            }
            obj[foodEntry["meal_name"]].push(foodEntry);
            return obj;
        }, {});
    });
}

module.exports = ClientFoodUserService;