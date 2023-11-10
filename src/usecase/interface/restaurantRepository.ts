import Restaurant from "../../domain/restaurant"

interface RestaurantRepository{
    addRestaurant(restaurantData:Restaurant)
    vendorRestaurant(vendorId:string)
    restaurantRequests()
    singleRestaurantRequest(restaurantId:string)
    changeRestaurantStatus(id:string,status:number)

    selectRestaurantCuisines(id:string,selectedCuisines:Array<string>)
    selectedCuisinesAndFacilities(id:string)
}

export default RestaurantRepository