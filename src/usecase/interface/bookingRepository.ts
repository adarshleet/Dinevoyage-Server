interface BookingRepository{
    dateSeatDetails(restaurantId:string,date:string,time:string)
    confirmBooking(restaurantId:string,date:string,time:string,table:string)
    tableCounts(restaurantId:string,date:string,time:string)
}

export default BookingRepository