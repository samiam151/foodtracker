const NUTRIENT_MAP = require("./nutrientMap");

module.exports = class NutrientResponse {
    constructor(res) {
        this.calories = res.calories;
        this.cautions = res.cautions;
        this.nutrients = Object.keys(res.totalNutrients).reduce((obj, nutrient) => {
            if (NUTRIENT_MAP.hasOwnProperty(nutrient)) {
                let n = NUTRIENT_MAP[nutrient],
                    resn = res.totalNutrients[nutrient];
                
                resn.quantity = Number.prototype.toFixed.call(resn.quantity, 1);
                obj[n.label.toLowerCase()] = resn; 
            }

            return obj;
        }, {})
        this.ingredients = res.ingredients;
    }
}

