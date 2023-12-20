import Reviews from "../../domain/reviews"

interface ReviewRepository{
    addReview(restaurantId:string,review:Reviews):Promise<any>
    getReviews(restaurantId:string):Promise<any>
    getAverage(restaurantId:string):Promise<any>
    userInBooking(restaurantId:string,userId:string):Promise<any>
    findReview(restaurantId:string,userId:string):Promise<any>
    editReview(restaurantId:string,review:Reviews):Promise<any>
}

export default ReviewRepository