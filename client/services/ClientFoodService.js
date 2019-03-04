const ClientFoodService = {};

ClientFoodService.searchFood = (input) => {
    let searchData = {
        input: input
    };
    return fetch("/api/food/search", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(searchData)
    }).then(res => res.json());
}

ClientFoodService.getSearchFoodNutrients = (food_id, measure_uri) => {
    return fetch("/api/food/nutrients", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            food_id: food_id,
            measure_uri: measure_uri
        })
    }).then(res => res.json());
}

module.exports = ClientFoodService;