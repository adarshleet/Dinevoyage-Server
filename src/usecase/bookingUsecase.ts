import BookingRepository from "./interface/bookingRepository";


class BookingUsecase{
    private bookingRepository : BookingRepository

    constructor(bookingRepository : BookingRepository){
        this.bookingRepository = bookingRepository
    }


    async dateSeatDetails(restaurantId:string,date:string,time:string){
        try {
            const seatDetails = await this.bookingRepository.dateSeatDetails(restaurantId,date,time)
            return{
                status:200,
                data : seatDetails
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    async confirmBooking(restaurantId:string,date:string,time:string,table:string){
        try {
            const bookingConfirm = await this.bookingRepository.confirmBooking(restaurantId,date,time,table)
            return{
                status:200,
                data:bookingConfirm
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    async tableCounts(restaurantId:string,date:string,time:string){
        try {
            const seatCounts = await this.bookingRepository.tableCounts(restaurantId,date,time)
            return{
                status:200,
                data:seatCounts
            }
        } catch (error) {
            console.log(error)
        }
    }


}

export default BookingUsecase