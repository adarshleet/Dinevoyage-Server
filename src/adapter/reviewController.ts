import { Request,Response } from "express";
import ReviewUsecase from "../usecase/reviewUsecase";
import jwt,{JwtPayload} from "jsonwebtoken";


class ReviewController{
    private ReviewUsecase : ReviewUsecase
    constructor(ReviewUsecase:ReviewUsecase){
        this.ReviewUsecase = ReviewUsecase
    }

    async addReview(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const review = req.body
            // console.log(restaurantId,review)

            let userId
            const token = req.cookies.userJWT
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id
            }
            review.userId = userId


            const reviewAdd = await this.ReviewUsecase.addReview(restaurantId,review)
            res.status(200).json(reviewAdd)

        } catch (error) {
            console.log(error)
        }
    }


    async getReviews(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const reviews = await this.ReviewUsecase.getReviews(restaurantId)
            res.status(200).json(reviews)
        } catch (error) {
            console.log(error)
        }
    }


    async getAverage(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const averageRating = await this.ReviewUsecase.getAverage(restaurantId)
            res.status(200).json(averageRating)
        } catch (error) {
            console.log(error)
        }
    }


    async userInBooking(req:Request,res:Response){
        try {

            const restaurantId = req.query.restaurantId as string
            let userId
            const token = req.cookies.userJWT
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id
            }

            const userFound = await this.ReviewUsecase.userInBooking(restaurantId,userId)
            res.status(200).json(userFound)

        } catch (error) {
            console.log(error)
        }
    }


    async findReview(req:Request,res:Response){
        try {

            const restaurantId = req.query.restaurantId as string
            let userId
            const token = req.cookies.userJWT
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id
            }

            const reviewFound = await this.ReviewUsecase.findReview(restaurantId,userId)
            res.status(200).json(reviewFound)
        } catch (error) {
            console.log(error)
        }
    }

    async editReview(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            let userId
            const token = req.cookies.userJWT
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id
            }

            const review = req.body
            review.userId = userId

            const reviewEdit = await this.ReviewUsecase.editReview(restaurantId,review)
            res.status(200).json(reviewEdit)

        } catch (error) {
            console.log(error)
        }
    }


}

export default ReviewController