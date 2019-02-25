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

module.exports = ClientFoodService;