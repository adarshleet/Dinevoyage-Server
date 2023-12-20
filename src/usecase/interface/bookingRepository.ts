import Booking from "../../domain/booking"

interface BookingRepository{
    dateSeatDetails(restaurantId:string,date:string,time:string):Promise<Booking | null>
    confirmBooking(bookingDetails:Booking):Promise<any>
    tableCounts(restaurantId:string,date:string,time:string):Promise<any>
    userBookings(userId:string):Promise<Array<Booking> | null>
    userBookingCancellation(bookingId:string,reason:string):Promise<any>


    //vendor
    //allbookings
    allBookings(restaurantId:string,page:number):Promise<any>
    changeBookingStatus(bookingId:string,reason:string):Promise<any>

    salesChart(restaurantId:string):Promise<any>


    //admin
    salesDetails():Promise<any>

}

export default BookingRepository