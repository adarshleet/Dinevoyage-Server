import Booking from "../../domain/booking"

interface BookingRepository{
    dateSeatDetails(restaurantId:string,date:string,time:string)
    confirmBooking(bookingDetails:Booking)
    tableCounts(restaurantId:string,date:string,time:string)
}

export default BookingRepository