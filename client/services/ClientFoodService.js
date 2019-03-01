const ClientFoodService = {};
const baseURL = "https://api.edamam.com/api/food-database/nutrients?app_id=3d5352c6&app_key=3ce91d25ef73167630dd0834ba2710d6";
const api_key = "3ce91d25ef73167630dd0834ba2710d6";
const api_id = "3d5352c6";


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

    return fetch("");
}

module.exports = ClientFoodService;