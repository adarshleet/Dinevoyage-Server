import { ObjectId } from "mongoose";

interface Reviews{
    userId ?:ObjectId,
    rating ?: number,
    review ?: string,
    date  ?: Date
}

export default Reviews