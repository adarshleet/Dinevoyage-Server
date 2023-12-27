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
                restaurantData.banners.map(async (file: any) => {
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



    async vendorRestaurant(vendorId: string) {
        try {
            const restaurant = await this.restaurantRepository.vendorRestaurant(vendorId)
            return {
                status: 200,
                data: restaurant
            }
        } catch (error) {
            console.log(error);

        }
    }


    async restaurantRequests() {
        try {
            const restaurantRequests = await this.restaurantRepository.restaurantRequests()
            return {
                status: 200,
                data: restaurantRequests
            }
        } catch (error) {
            console.log(error)
        }
    }


    //single restaurant request
    async singleRestaurantRequest(restaurantId: string) {
        try {
            const restaurantData = await this.restaurantRepository.singleRestaurantRequest(restaurantId)
            return {
                status: 200,
                data: restaurantData
            }
        } catch (error) {
            console.log(error)
        }
    }


    //change restaurant status
    async changeRestaurantStatus(id: string, status: number) {
        try {
            const restaurantStatus = await this.restaurantRepository.changeRestaurantStatus(id, status)
            return {
                status: 200,
                data: restaurantStatus
            }
        } catch (error) {
            console.log(error)
        }
    }


    //changing restaurant cuisines by vendor
    async selectCuisines(id: string, cuisines: Array<string>) {
        try {
            const selectedCuisines = await this.restaurantRepository.selectRestaurantCuisines(id, cuisines)
            return {
                status: 200,
                data: selectedCuisines
            }
        } catch (error) {
            console.log(error)
        }
    }


    //changing restaurant facilities by vendor
    async selectFacilities(id: string, facilities: Array<string>) {
        try {
            const selectedFacilities = await this.restaurantRepository.selectRestaurantFacilities(id, facilities)
            return {
                status: 200,
                data: selectedFacilities
            }
        } catch (error) {
            console.log(error);
        }
    }



    //already selected cuisines and facilities
    async selectedCuisinesAndFacilities(id: string) {
        try {
            const selectedCuisinesAndFacilities = await this.restaurantRepository.selectedCuisinesAndFacilities(id)
            return {
                status: 200,
                data: selectedCuisinesAndFacilities
            }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }


    //restauarnt details for editing
    async getRestaurantDetails(restauarantId: string) {
        try {
            const restauarantDetails = await this.restaurantRepository.getRestaurantDetails(restauarantId)
            return {
                status: 200,
                data: restauarantDetails
            }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }


    //remove banner
    async removeRestaurantBanner(restaurantId: string, image: string) {
        try {
            const removeBanner = this.restaurantRepository.removeRestaurantBanner(restaurantId, image)
            return {
                status: 200,
                data: removeBanner
            }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }


    //edit restaurant details
    async editRestaurant(restaurantId: string, restaurantDetails: Restaurant) {
        try {
            if (restaurantDetails.banners) {
                const uploadedBanners = await Promise.all(
                    restaurantDetails.banners.map(async (file: any) => {
                        return await this.cloudinary.saveToCloudinary(file);
                    })
                );
                console.log(uploadedBanners)
                restaurantDetails.banners = uploadedBanners
            }
            

            const editedRestauarantStatus = await this.restaurantRepository.editRestaurant(restaurantId, restaurantDetails)
            return {
                status: 200,
                data: editedRestauarantStatus
            }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }


    


    //User
    //searching restaurant
    async searchRestaurants(searcQuery: string) {
        try {
            const searchResults = await this.restaurantRepository.searchRestaurant(searcQuery)
            return {
                status: 200,
                data: searchResults
            }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }


    //filter restaurant
    async filterRestaurants(cuisines: string[], facilities: string[],page:number) {
        try {
            const restaurants = await this.restaurantRepository.filterRestaurant(cuisines, facilities,page)
            return {
                status: 200,
                data: restaurants
            }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }

    async popularRestaurants(){
        try {
            const restauarants = await this.restaurantRepository.popularRestaurants()
            return{
                status:200,
                data:restauarants
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }

}

export default RestaurantUsecase