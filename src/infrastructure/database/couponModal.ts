import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface ICoupon extends Document{
    _id:ObjectId,
    couponName: string | null,
    maximumDisount : number | null,
    minimumPurchase : number | null,
    expiryDate : Date | null,
    usedUsers : Array<string> | null
}

const couponSchema:Schema = new Schema({
    couponName:{
        type:String
    },
    maximumDiscount:{
        type:Number
    },
    minimumPurchase:{
        type:Number
    },
    expiryDate:{
        type:Date
    },
    isListed:{
        type:Boolean,
        default:true
    },
    usedUsers:{
        type:Array
    }
},
{
    timestamps:true
}
)

const couponModel = mongoose.model<ICoupon>('Coupon',couponSchema)

export default couponModel