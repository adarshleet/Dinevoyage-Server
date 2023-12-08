import ReviewRepository from "./interface/reviewRepository";
import Reviews from "../domain/reviews";

class ReviewUsecase{
    private ReviewRepository : ReviewRepository
    constructor(ReviewRepository:ReviewRepository){
        this.ReviewRepository = ReviewRepository
    }

    async addReview(restaurantId:string,review:Reviews){
        try {
            const reviewAdd = await this.ReviewRepository.addReview(restaurantId,review)
            return{
                status:200,
                data:reviewAdd
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }

    async getReviews(restaurantId:string){
        try {
            const reviews = await this.ReviewRepository.getReviews(restaurantId)
            return{
                status:200,
                data:reviews
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    async getAverage(restaurantId:string){
        try {
            const averageRating = await this.ReviewRepository.getAverage(restaurantId)
            return{
                status:200,
                data:averageRating
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    async userInBooking(restaurantId:string,userId:string){
        try {
            const userFound = await this.ReviewRepository.userInBooking(restaurantId,userId)
            return{
                status:200,
                data:userFound
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    async findReview(restauarantId:string,userId:string){
        try {
            const reviewFound = await this.ReviewRepository.findReview(restauarantId,userId)
            return{
                status:200,
                data: reviewFound
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    async editReview(restaurantId:string,review:Reviews){
        try {
            const reviewEdit = await this.ReviewRepository.editReview(restaurantId,review)
            return{
                status:200,
                data:reviewEdit
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }

}

export default ReviewUsecase