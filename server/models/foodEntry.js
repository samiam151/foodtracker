class FoodEntry {
    constructor(initObj) {
        if (!initObj || Object.is(initObj, {})) {
            throw new Error("Food Entry: No initialization object given.")
        }

        this.user_id = initObj["user_id"];
        this.food_id = initObj["food_id"];
        this.meal_name = initObj["meal_name"];
        this.quantity = initObj["quantity"];
        this.calories = initObj["calories"];
        this.food_name = initObj["food_name"];
        this.measure = initObj["measure"];
    }

    toJson() {
        return JSON.stringify({
            "user_id": this.user_id,
            "food_id": this.food_id,
            "meal_name": this.meal_name,
            "quantity": this.quantity,
            "calories": this.calories,
            "food_name": this.food_name,
            "measure": this.measure
        });
    }

    toArray() {
        return [
            this.user_id, 
            this.food_id, 
            this.meal_name, 
            this.quantity, 
            this.calories, 
            this.food_name,
            this.measure
        ];
    }
}

module.exports = FoodEntry;