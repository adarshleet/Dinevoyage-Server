import Restaurant from "../../domain/restaurant"

interface RestaurantRepository{
    addRestaurant(restaurantData:Restaurant)
    vendorRestaurant(vendorId:string)
    restaurantRequests()
    singleRestaurantRequest(restaurantId:string)
    changeRestaurantStatus(id:string,status:number)
}

export default RestaurantRepository