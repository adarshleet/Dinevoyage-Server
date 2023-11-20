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
        items : [{
            itemName : string,
            price : string
        }]
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
        }]
    }]
})


const bookingModel = mongoose.model<IBooking>('Booking',bookingSchema)
export default bookingModel


