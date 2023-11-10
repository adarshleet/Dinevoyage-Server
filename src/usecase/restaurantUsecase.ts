import RestaurantRepository from "./interface/restaurantRepository";
import Restaurant from "../domain/restaurant";
import Cloudinary from "../infrastructure/utils/cloudinary";
class RestaurantUsecase {
    private restaurantRepository: RestaurantRepository
    private cloudinary: Cloudinary

    constructor(restaurantRepository: RestaurantRepository, cloudinary: Cloudinary) {
        this.restaurantRepository = restaurantRepository
        this.cloudinary = cloudinary
    }

    async addRestaurant(restaurantData: Restaurant) {
        try {
            const uploadedBanners = await Promise.all(
                restaurantData.banners.map(async (file:any) => {
                    return await this.cloudinary.saveToCloudinary(file);
                })
            );

            restaurantData.banners = uploadedBanners

            const restaurantStatus = await this.restaurantRepository.addRestaurant(restaurantData)

            return {
                status: 200,
                success: true,
                data: restaurantStatus
            }
        } catch (error) {
            console.log(error)
        }
    }



    async vendorRestaurant(vendorId:string){
        try {
            const restaurant = await this.restaurantRepository.vendorRestaurant(vendorId)
            return{
                status:200,
                data:restaurant
            }
        } catch (error) {
            console.log(error);
            
        }
    }


    async restaurantRequests(){
        try {
            const restaurantRequests = await this.restaurantRepository.restaurantRequests()
            return{
                status:200,
                data:restaurantRequests
            }
        } catch (error) {
            console.log(error)
        }
    }


    //single restaurant request
    async singleRestaurantRequest(restaurantId:string){
        try {
            const restaurantData = await this.restaurantRepository.singleRestaurantRequest(restaurantId)
            return{
                status:200,
                data:restaurantData
            }
        } catch (error) {
            console.log(error)
        }
    }


    //change restaurant status
    async changeRestaurantStatus(id:string,status:number){
        try {
            const restaurantStatus = await this.restaurantRepository.changeRestaurantStatus(id,status)
            return{
                status:200,
                data:restaurantStatus
            }
        } catch (error) {
            console.log(error)
        }
    }


    //changing restaurant cuisines by vendor
    async selectCuisines(id:string,cuisines:Array<string>){
        try {
            const selectedCuisines = await this.restaurantRepository.selectRestaurantCuisines(id,cuisines)
            return{
                status:200,
                data: selectedCuisines
            }
        } catch (error) {
            console.log(error)
        }
    }



    //already selected cuisines and facilities
    async selectedCuisinesAndFacilities(id:string){
        try {
            const selectedCuisinesAndFacilities = await this.restaurantRepository.selectedCuisinesAndFacilities(id)
            return{
                status:200,
                data:selectedCuisinesAndFacilities
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export default RestaurantUsecase