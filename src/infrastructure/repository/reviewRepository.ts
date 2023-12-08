import ReviewModel from "../database/reviewModel";
import ReviewRepository from "../../usecase/interface/reviewRepository";
import Reviews from "../../domain/reviews";
import { Types } from 'mongoose';
import bookingModel from "../database/bookingsModel";



class reviewRepository implements ReviewRepository{
    async addReview(restaurantId: string, review: Reviews) {
        try {
            const reviewAdd = await ReviewModel.updateOne({restaurantId},{$push:{reviews:review}},{upsert:true})
            return reviewAdd
        } catch (error) {
            console.log(error)
        }
    }

    async getReviews(restaurantId: string) {
        try {
            const reviews = await ReviewModel.findOne({restaurantId}).populate('reviews.userId')
            return reviews
        } catch (error) {
            console.log(error)
        }
    }

    async getAverage(restaurantId: string) {
        try {
            const averageRating = await ReviewModel.aggregate([
                {
                    $match: {
                        restaurantId: new Types.ObjectId(restaurantId)

                    }
                },
                {
                    $unwind: "$reviews"
                },
                {
                    $group: {
                        _id: null,
                        totalCount: { $sum: 1 },
                        totalScore: { $sum: "$reviews.rating" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalCount : "$totalCount",
                        averageRating: { $divide: ["$totalScore", "$totalCount"] }
                    }
                }])
                return averageRating[0]
        } catch (error) {
            console.log(error)
        }
    }



    //checking user is on booking of the restaurant
    async userInBooking(restaurantId: string, userId: string) {
        try {
            const userFound = await bookingModel.findOne({
                'restaurantId': restaurantId,
                'bookings': {
                  $elemMatch: {
                    'user': userId,
                    'orderStatus': 3,
                  },
                },
              })
            return userFound
        } catch (error) {
            console.log(error)
        }
    }


    async findReview(restaurantId: string, userId: string) {
        try {
            const reviewFound = await ReviewModel.findOne({restaurantId,'reviews.userId':userId}) 
            return reviewFound
        } catch (error) {
            console.log(error)
        }
    }


    async editReview(restaurantId: string, review: Reviews) {
        try {
            const reviewEdit = await ReviewModel.updateOne(
                { restaurantId, 'reviews.userId': review.userId },
                { $set: { 'reviews.$.rating': review.rating, 'reviews.$.review': review.review } }
              );
            return reviewEdit
        } catch (error) {
            console.log(error)
        }
    }

}

export default reviewRepository