import BookingRepository from "./interface/bookingRepository";
import StripePayment from "../infrastructure/utils/stripe";
import Booking from "../domain/booking";


class BookingUsecase{
    private bookingRepository : BookingRepository
    private StripePayment : StripePayment

    constructor(bookingRepository : BookingRepository,StripePayment:StripePayment){
        this.bookingRepository = bookingRepository
        this.StripePayment = StripePayment
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


    async confirmBooking(bookingDetails:Booking){
        try {
            const bookingConfirm = await this.bookingRepository.confirmBooking(bookingDetails)
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


    async makePayment(bookingDetails:Booking){
        try {
            const totalPrice = bookingDetails?.total as number
            console.log(totalPrice)
            const paymentDetails = await this.StripePayment.makePayment(totalPrice);
            console.log(paymentDetails)
            return{
                status:200,
                data : paymentDetails
            }
        } catch (error) {
            console.log(error)
        }
    }


}

export default BookingUsecase