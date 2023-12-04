import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IBooking extends Document{
    _id ?: ObjectId,
    restaurantId : ObjectId,
    bookings:[{
        user:ObjectId,
        guestName : string,
        guestCount : number,
        guestMobile : string,
        time : string,
        date : string,
        special: string,
        cancelReason : string,
        items : [{
            itemName : string,
            price : string
        }],
        totalAmount : number
    }]
}


const bookingSchema:Schema = new Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Restaurant'
    },
    bookings:[{
        user :{
            type:mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        name : {
            type:String
        },
        guestCount:{
            type:Number
        },
        table:{
            type:String
        },
        mobile :{
            type:String
        },
        special:{
            type:String
        },
        time:{
            type:String
        },
        date:{
            type:String
        },
        orderStatus:{
            type:Number,
            default:1
        },
        cancelReason:{
            type:String
        },
        items:[{
            item:{
                type: String
            },
            price:{
                type : Number
            },
            count:{
                type:Number
            }
        }],
        totalAmount : {
            type: Number
        },
        appliedCoupon:{
            type:Object
        },
        walletAmountUsed:{
            type:Number
        }
    }]
})


const bookingModel = mongoose.model<IBooking>('Booking',bookingSchema)
export default bookingModel


