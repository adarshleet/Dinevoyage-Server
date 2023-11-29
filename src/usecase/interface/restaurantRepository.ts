import Restaurant from "../../domain/restaurant"

interface RestaurantRepository{
    restaurantRequests()

    addRestaurant(restaurantData:Restaurant)
    vendorRestaurant(vendorId:string)
    singleRestaurantRequest(restaurantId:string)
    changeRestaurantStatus(id:string,status:number)
    getRestaurantDetails(restauarantId:string)
    selectRestaurantCuisines(id:string,selectedCuisines:Array<string>)
    selectRestaurantFacilities(id:string,selectedFacilities:Array<string>)
    selectedCuisinesAndFacilities(id:string)
    removeRestaurantBanner(restauarantId:string,image:string)
    editRestaurant(restaurantId:string,restaurantDetails:Restaurant)


    searchRestaurant(searchQuery:string)
    filterRestaurant(cuisines:Array<string>,facilities:Array<string>)
}

export default RestaurantRepository