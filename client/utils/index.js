export const splitMeals = (meals = []) => {
    if (meals.length === 0) return [];
    return meals.reduce((obj, foodEntry) => {
        if (!obj[foodEntry["meal_name"]]) {
            obj[foodEntry["meal_name"]] = [];
        }
        obj[foodEntry["meal_name"]].push(foodEntry);
        return obj;
    }, {});
}

export const getTodaysDate = () => {
    let _d = new Date().toLocaleDateString().split("/");
    let today = `${_d[2]}-${_d[0].padStart(2, '0')}-${_d[1].padStart(2, '0')}`;
    return today;
}