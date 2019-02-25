class Ingredient {
    constructor(obj) {
        if (!obj) throw new Error("Ingredient: No config object given.")
        this.quantity = obj['quantity'];
        this.measure = obj['measureURI'];
        this.foodId = obj["foodId"];
    }

    toJSON() {
        return JSON.stringify({
            quantity: this.quantity,
            measureURI: this.measure,
            foodId: this.foodId
        });
    }
}