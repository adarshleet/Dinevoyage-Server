import Restaurant from "../../domain/restaurant"

interface RestaurantRepository{
    restaurantRequests():Promise<any>

    addRestaurant(restaurantData:Restaurant):Promise<any>
    vendorRestaurant(vendorId:string):Promise<any>
    singleRestaurantRequest(restaurantId:string):Promise<any>
    changeRestaurantStatus(id:string,status:number):Promise<any>
    getRestaurantDetails(restauarantId:string):Promise<any>
    selectRestaurantCuisines(id:string,selectedCuisines:Array<string>):Promise<any>
    selectRestaurantFacilities(id:string,selectedFacilities:Array<string>):Promise<any>
    selectedCuisinesAndFacilities(id:string):Promise<any>
    removeRestaurantBanner(restauarantId:string,image:string):Promise<any>
    editRestaurant(restaurantId:string,restaurantDetails:Restaurant):Promise<any>

    popularRestaurants():Promise<any>


    searchRestaurant(searchQuery:string):Promise<any>
    filterRestaurant(cuisines:Array<string>,facilities:Array<string>,page:number):Promise<any>
}

export default RestaurantRepository