class Food {
    constructor(dataObj) {
        let foodData = dataObj["food"],
            measuresData = dataObj["measures"],
            nutrients = foodData.nutrients;

        this.id = foodData.foodId;
        this.label = foodData.label;
        this.carbohydrate = nutrients.CHOCDF;
        this.protein = nutrients.PROCNT;
        this.fat = nutrients.FAT;
        this.calories = nutrients.ENERC_KCAL.toFixed(1);

        this.measures = measuresData;
        this.data = dataObj;
    }
}

module.exports = Food;