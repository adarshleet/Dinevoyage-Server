import { ObjectId } from "mongoose"

interface Booking{
    // _id ?: ObjectId,
    // restaurantId ?: ObjectId,
    // bookings ?:{
        user ?:ObjectId,
        guestName ?: string,
        guestCount ?: number,
        guestMobile ?: string,
        time ?: string,
        date ?: string,
        items ?: {
            itemName ?: string,
            price ?: string
        }
    // }
}

export default Booking