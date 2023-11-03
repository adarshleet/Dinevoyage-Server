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
            console.log('here', restaurantData)
            // const banners = await this.cloudinary.saveToCloudinary(restaurantData.banners[0])
            const uploadedBanners = await Promise.all(
                restaurantData.banners.map(async (file:any) => {
                    return await this.cloudinary.saveToCloudinary(file);
                })
            );

            // uploadedBanners is an array containing the results of cloudinary.saveToCloudinary()
            console.log(uploadedBanners);

            const restaurantStatus = await this.restaurantRepository.addRestaurant(restaurantData)

            return {
                status: 200,
                data: restaurantStatus
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default RestaurantUsecase