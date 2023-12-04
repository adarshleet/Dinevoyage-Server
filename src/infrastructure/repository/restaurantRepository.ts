import restaurantModel from "../database/restaurantModel";
import RestaurantRepository from "../../usecase/interface/restaurantRepository";
import Restaurant from "../../domain/restaurant";
import kitchenModel from "../database/KitchenModel";
import { Types } from 'mongoose';

class restaurantRepository implements RestaurantRepository {
    async addRestaurant(restaurantData: Restaurant) {
        const restaurant = new restaurantModel(restaurantData)
        const restaurantRequest = await restaurant.save()
        return restaurantRequest
    }

    async vendorRestaurant(vendorId: string) {
        const restaurant = await restaurantModel.find({ vendorId })
        return restaurant
    }



    //taking restaurants requests for admin
    async restaurantRequests() {
        const restaurantRequests = await restaurantModel.find({ status: { $lt: 3 } }).populate('vendorId');
        return restaurantRequests
    }


    //single restaurant request full details
    async singleRestaurantRequest(restaurantId: string) {
        const restaurantDetails = await restaurantModel.findById(restaurantId)
        return restaurantDetails
    }


    //change restaurant status
    async changeRestaurantStatus(id: string, status: number) {
        const restaurantStatus = await restaurantModel.findByIdAndUpdate(id, { $set: { status } }, { new: true })
        return restaurantStatus
    }



    //selecting restauarant cuisines by vendor
    async selectRestaurantCuisines(id: string, selectedCuisines: string[]) {
        const cuisineSelect = await restaurantModel.findOneAndUpdate({ _id: id }, { $set: { cuisines: selectedCuisines } }, { new: true })
        return cuisineSelect
    }


    //selecting restaurant facilities by vendor
    async selectRestaurantFacilities(id: string, selectedFacilities: string[]) {
        const facilitySelect = await restaurantModel.findOneAndUpdate({ _id: id }, { $set: { facilities: selectedFacilities } }, { new: true })
        return facilitySelect
    }


    //already selected cuisines for showing
    async selectedCuisinesAndFacilities(id: string) {
        const selectedCuisines = await restaurantModel.find({ vendorId: id, status: { $gt: 3 } })
        return selectedCuisines
    }

    async getRestaurantDetails(restauarantId: string) {
        try {
            const restauarantDetails =  await restaurantModel.findOne({_id:restauarantId})
            return restauarantDetails
        } catch (error) {
            console.log(error)
        }
    }


    //remove restaurant banner
    async removeRestaurantBanner(restauarantId: string, image: string) {
        try {
            const removeBanner = await restaurantModel.findByIdAndUpdate(restauarantId,{$pull:{banners:image}})
            return removeBanner
        } catch (error) {
            console.log(error);
        }
    }


    //edit restaurant details
    async editRestaurant(restaurantId: string, restaurantDetails: Restaurant) {
        try {

            let { banners, ...restDetailsWithoutBanners } = restaurantDetails;
            if(!banners){
                banners = []
            }
            const editedRestauarantStatus = await restaurantModel.findByIdAndUpdate(restaurantId,
                {$set:{...restDetailsWithoutBanners},
                $push:{banners:{$each:banners}}},
                {new:true}
            )

            return editedRestauarantStatus
        } catch (error) {
            console.log(error)
        }
    }


    



    //user
    //search restaurants
    async searchRestaurant(searchQuery: string) {
        try {

            const restaurantIds = await kitchenModel.find({
                items: { $exists: true, $not: { $size: 0 } }
            }, { restaurantId: 1, _id: 0 })

            const restaurantIdStrings = restaurantIds.map((res) => res.restaurantId?.toString())

            const searchResults = await restaurantModel.find({
                _id: { $in: restaurantIdStrings },
                $or: [
                    { restaurantName: { $regex: searchQuery, $options: 'i' } },
                    { locality: { $regex: searchQuery, $options: 'i' } },
                    { landmark: { $regex: searchQuery, $options: 'i' } },
                    { district: { $regex: searchQuery, $options: 'i' } },
                ],
            });
            return searchResults

        } catch (error) {
            console.log(error)
        }
    }



    async filterRestaurant(cuisines: string[], facilities: string[],page:number) {
        try {
            const restaurantIds = await kitchenModel.find({
                items: { $exists: true, $not: { $size: 0 } }
            }, { restaurantId: 1, _id: 0 });

            const restaurantIdStrings = restaurantIds.map((res) => res.restaurantId?.toString());

            const limit = 3
            
            let filterResult,totalPages


            if (!cuisines.length && !facilities.length) {
                filterResult = await restaurantModel.find({
                    _id: { $in: restaurantIdStrings }
                }).skip((page-1)*limit).limit(limit)

                const totalCount = await restaurantModel.find({
                    _id: { $in: restaurantIdStrings }
                }).countDocuments()

                totalPages = Math.floor(totalCount/limit)
                
            }
            else {
                filterResult = await restaurantModel.find({
                    _id: { $in: restaurantIdStrings },
                    $or: [
                        { cuisines: { $all: cuisines } },
                        { facilities: { $all: facilities } },
                    ],
                }).skip((page-1)*limit).limit(limit)

                const totalCount = await restaurantModel.find({
                    _id: { $in: restaurantIdStrings },
                    $or: [
                        { cuisines: { $all: cuisines } },
                        { facilities: { $all: facilities } },
                    ],
                }).countDocuments()

                totalPages = Math.floor(totalCount/limit)
            }


            return{
                filterResult,
                totalPages
            } 
        } catch (error) {
            console.log(error);
            // Handle the error appropriately, e.g., throw or return an error message
        }
    }

}

export default restaurantRepository