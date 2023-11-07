import restaurantModel from "../database/restaurantModel";
import RestaurantRepository from "../../usecase/interface/restaurantRepository";
import Restaurant from "../../domain/restaurant";

class restaurantRepository implements RestaurantRepository{
    async addRestaurant(restaurantData: Restaurant) {
        const restaurantRequest = new restaurantModel(restaurantData)
        await restaurantRequest.save()
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

}

export default restaurantRepository