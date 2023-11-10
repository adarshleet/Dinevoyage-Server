import restaurantModel from "../database/restaurantModel";
import RestaurantRepository from "../../usecase/interface/restaurantRepository";
import Restaurant from "../../domain/restaurant";

class restaurantRepository implements RestaurantRepository{
    async addRestaurant(restaurantData: Restaurant) {
        const restaurant = new restaurantModel(restaurantData)
        const restaurantRequest = await restaurant.save()
        return restaurantRequest
    }

    async vendorRestaurant(vendorId: string) {
        const restaurant = await restaurantModel.find({vendorId})
        return restaurant
    }



    //taking restaurants requests for admin
    async restaurantRequests() {
        const restaurantRequests = await restaurantModel.find({status:{$lt:3}}).populate('vendorId');
        return restaurantRequests
    }


    //single restaurant request full details
    async singleRestaurantRequest(restaurantId:string){
        const restaurantDetails = await restaurantModel.findById(restaurantId)
        return restaurantDetails
    } 


    //change restaurant status
    async changeRestaurantStatus(id: string, status: number) {
        const restaurantStatus = await restaurantModel.findByIdAndUpdate(id,{$set:{status}},{ new: true })
        return restaurantStatus
    }



    //selecting restauarant cuisines by vendor
    async selectRestaurantCuisines(id: string, selectedCuisines: string[]) {
        const cuisineSelect = await restaurantModel.findOneAndUpdate({_id:id},{$set:{cuisines:selectedCuisines}},{new:true})
        return cuisineSelect
    }


    //selecting restaurant facilities by vendor
    async selectRestaurantFacilities(id: string, selectedFacilities: string[]) {
        const facilitySelect = await restaurantModel.findOneAndUpdate({_id:id},{$set:{facilities:selectedFacilities}},{new:true})
        return facilitySelect
    }


    //already selected cuisines for showing
    async selectedCuisinesAndFacilities(id: string) {
        console.log(id)
        const selectedCuisines = await restaurantModel.find({vendorId:id,status:{$gt:3}})
        return selectedCuisines   
    }

}

export default restaurantRepository