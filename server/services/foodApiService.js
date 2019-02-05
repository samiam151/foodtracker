const dotenv = require('dotenv');
const { URL } = require("url");
const fetch = require("node-fetch").default;
dotenv.config();
let FoodAPIService = {};

// Configure base url with credientials
let baseURL = new URL("https://api.edamam.com/api/food-database/parser");
baseURL.searchParams.set("app_key", process.env.FOOD_TRACKER_APPKEY);
baseURL.searchParams.set("app_id", process.env.FOOD_TRACKER_APPID);

/**
 * Given a search value, this returns a Promise for the values ingredient data
 * @param {string} value
 * @returns {Promise}
 */
FoodAPIService.findIngredient = (value) => {
    let url = new URL(baseURL.href);
    url.searchParams.set("ingr", encodeURIComponent(value));
    return fetch(url.href)
        .then(data => data.json());
}


module.exports = FoodAPIService;