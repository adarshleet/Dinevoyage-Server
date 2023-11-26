import Booking from "../../domain/booking"

interface BookingRepository{
    dateSeatDetails(restaurantId:string,date:string,time:string)
    confirmBooking(bookingDetails:Booking)
    tableCounts(restaurantId:string,date:string,time:string)
    userBookings(userId:string)
    userBookingCancellation(bookingId:string,reason:string)


    //admin
    //allbookings
    allBookings(restaurantId:string,page:number)
    changeBookingStatus(bookingId:string,reason:string)
}

export default BookingRepository