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
    }).then(res => res.json());
}

module.exports = ClientFoodUserService;