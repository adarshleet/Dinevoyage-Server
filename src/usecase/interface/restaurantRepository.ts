import Restaurant from "../../domain/restaurant"

interface RestaurantRepository{
    addRestaurant(restaurantData:Restaurant)
    vendorRestaurant(vendorId:string)
    restaurantRequests()
    singleRestaurantRequest(restaurantId:string)
    changeRestaurantStatus(id:string,status:number)

    selectRestaurantCuisines(id:string,selectedCuisines:Array<string>)
    selectRestaurantFacilities(id:string,selectedFacilities:Array<string>)
    selectedCuisinesAndFacilities(id:string)

    searchRestaurant(searchQuery:string)
    filterRestaurant(cuisines:Array<string>,facilities:Array<string>)
}

export default RestaurantRepository