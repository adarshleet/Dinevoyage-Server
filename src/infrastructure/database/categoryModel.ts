import mongoose, { Schema, Document, ObjectId } from 'mongoose';


export interface ICategory extends Document{
    _id:ObjectId,
    restaurantId: ObjectId | null,
    category : String | null,
    isListed : Boolean | null
}


const categorySchema:Schema = new Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Restaurant'
    },
    category:{
        type : String
    },
    isListed:{
        type : Boolean,
        default:true
    }
})

const categoryModel = mongoose.model<ICategory>('Category',categorySchema)

export default categoryModel
