import mongoose, { Schema, Document, ObjectId } from 'mongoose';


export interface IKitchen extends Document{
    _id:ObjectId,
    restaurantId: ObjectId | null,
    items:Array<object>
}


const kitchenSchema:Schema = new Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Restaurant'
    },
    items:[{
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref : 'Category'
        }
    }]
})

const kitchenModel = mongoose.model<IKitchen>('Kitchen',kitchenSchema)
export default kitchenModel