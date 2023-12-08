import Reviews from "../../domain/reviews"

interface ReviewRepository{
    addReview(restaurantId:string,review:Reviews)
    getReviews(restaurantId:string)
    getAverage(restaurantId:string)
    userInBooking(restaurantId:string,userId:string)
    findReview(restaurantId:string,userId:string)
    editReview(restaurantId:string,review:Reviews)
}

export default ReviewRepository