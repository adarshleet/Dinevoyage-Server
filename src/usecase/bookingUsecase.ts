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
            const totalPrice = bookingDetails?.totalAmount as number
            const paymentDetails = await this.StripePayment.makePayment(totalPrice);
            return{
                status:200,
                data : paymentDetails
            }
        } catch (error) {
            console.log(error)
        }
    }



    //all booking for user
    async userBookings(userId:string){
        try {
            const bookings = await this.bookingRepository.userBookings(userId)
            return{
                status:200,
                data:bookings
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    //user booking cancellation
    async userBookingCancellation(bookingId:string,reason:string){
        try {
            const bookingStatus = await this.bookingRepository.userBookingCancellation(bookingId,reason)
            return{
                status:200,
                data:bookingStatus
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }



    //admin
    //all bookings
    async allBookings(restaurantId:string,page:number){
        try {
            const allBookingDetails = await this.bookingRepository.allBookings(restaurantId,page)
            return{
                status:200,
                data:allBookingDetails
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }

    //change booking status
    async changeBookingStatus(bookingId:string,reason:string){
        try {
            const bookingStatus = await this.bookingRepository.changeBookingStatus(bookingId,reason)
            return{
                status:200,
                data:bookingStatus
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }

}

export default BookingUsecase