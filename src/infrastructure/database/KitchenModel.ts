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
        itemName:{
            type:String
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref : 'Category'
        },
        price:{
            type:Number
        },
        veg:{
            type:Boolean,
            default:false
        },
        image:{
            type:String
        },
        description:{
            type:String
        },
        isListed:{
            type:Boolean,
            default:true
        }
    }]
})

const kitchenModel = mongoose.model<IKitchen>('Kitchen',kitchenSchema)
export default kitchenModel