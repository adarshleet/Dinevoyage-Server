
import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IReviews extends Document{
    _id ?:string
    restaurantId ?: ObjectId,
    reviews:[
        userId ?:ObjectId,
        rating ?: number,
        review ?: string,
        date  ?: Date
    ]
}


const reviewSchema:Schema = new Schema({
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    reviews:[{
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating:{
            type : Number
        },
        review:{
            type: String
        },
        date:{
            type :Date,
            default : new Date()
        }
    }]
})


const ReviewModel = mongoose.model<IReviews>('Review',reviewSchema)

export default ReviewModel