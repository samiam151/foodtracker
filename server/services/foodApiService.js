const dotenv = require('dotenv');
const { URL } = require("url");
const fetch = require("node-fetch").default;
dotenv.config();
let FoodAPIService = {};

const Food = require("../models/food");
const NutrientResponse =  require("../models/nutrientResponse");

// Configure base url with credientials
let parserURL = new URL("https://api.edamam.com/api/food-database/parser");
let nutrientsURL = new URL("https://api.edamam.com/api/food-database/nutrients");

[parserURL, nutrientsURL].forEach(baseURL => {
    baseURL.searchParams.set("app_key", process.env.FOOD_TRACKER_APPKEY);
    baseURL.searchParams.set("app_id", process.env.FOOD_TRACKER_APPID);
});

/**
 * Given a search value, this returns a Promise for the values ingredient data
 * @param {string} value
 * @returns {Promise}
 */
FoodAPIService.findIngredient = (value) => {
    let url = new URL(parserURL.href);
    url.searchParams.set("ingr", encodeURIComponent(value));
    return fetch(url.href)
        .then(data => {
            let datum = data.json();
            return datum;
        });
}

/**
 * Given a food id, and measurement uri, this returns the the nutrition info
 * for the given unit of measurement.
 * @param {string} food_id
 * @param {string} measure_uri
 * @param {number} quantity
 */
FoodAPIService.getNutrients = (food_id, measure_uri, quantity = 1) => {
    let url = new URL(nutrientsURL.href);
    return fetch(url.href, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "yield": 1,
            "ingredients": [
                {
                    "foodId": food_id,
                    "measureURI": measure_uri,
                    "quantity": quantity
                }
            ]
        })
    })
    .then(res => res.json());
    
};

module.exports = FoodAPIService;
if (require.main === module) {
    FoodAPIService.getNutrients(
        "food_bcruvycav1jponay8eu0oa5fkbhx",
        "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce"
    ).then(res => {
        console.log(res);
    })
}