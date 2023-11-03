import Restaurant from "../../domain/restaurant"

interface RestaurantRepository{
    addRestaurant(restaurantData:Restaurant)
}

export default RestaurantRepository