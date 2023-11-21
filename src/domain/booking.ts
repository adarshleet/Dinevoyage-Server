import { ObjectId } from "mongoose"

interface Booking{
    // _id ?: ObjectId,
    restaurantId ?: string,
    // bookings ?:{
        user ?:ObjectId,
        guestName ?: string,
        guestCount ?: number,
        guestMobile ?: string,
        time ?: string,
        date ?: string,
        totalAmount ?: number, 
        items ?: {
            itemName ?: string,
            price ?: number,
            count ?: number
        }
    // }
}

export default Booking