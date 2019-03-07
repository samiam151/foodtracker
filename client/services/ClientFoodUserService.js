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

ClientFoodUserService.submitFoodEntry = (foodEntryInfo) => {
    console.log(foodEntryInfo);
    // foodEntryInfo["quantity"] = +foodEntryInfo.quantity;
    // if (foodEntryInfo.quantity_fraction) {
    //     foodEntryInfo["quantity"] = foodEntryInfo.quantity + (+foodEntryInfo.quantity_fraction);
    // }
    // foodEntryInfo["calories"] = Number.parseInt(foodEntryInfo.calories);

    return fetch("/api/food/addFoodEntry", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(foodEntryInfo)
    })
    .then(res => res.json())
}

module.exports = ClientFoodUserService;