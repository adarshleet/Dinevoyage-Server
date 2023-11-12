import { ObjectId } from "mongoose";

interface Category{
    _id:string,
    restaurantId: ObjectId,
    categories: object
}