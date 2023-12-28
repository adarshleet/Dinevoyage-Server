import { Request,Response } from "express";
import BookingUsecase from "../usecase/bookingUsecase";
import Session from "../infrastructure/repository/session";
import jwt,{JwtPayload} from "jsonwebtoken";
import Booking from "../domain/booking";

class BookingController{
    private bookingUsecase : BookingUsecase
    private session : Session

    constructor(bookingUsecase : BookingUsecase,session:Session){
        this.bookingUsecase = bookingUsecase
        this.session = session
    }


    async dateSeatDetails(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const {date,time} = req.body

            const seatDetails = await this.bookingUsecase.dateSeatDetails(restaurantId,date,time)
            res.status(200).json(seatDetails)
        } catch (error) {
            console.log(error);
        }
    }


    async confirmBooking(req:Request,res:Response){
        try {
            const bookingDetails = req.app.locals as Booking
            console.log('dfdfd',bookingDetails)
            if(req.body.data.object.status == 'complete'){
        
                const bookingConfirm = await this.bookingUsecase.confirmBooking(bookingDetails)

                res.status(200).json(bookingConfirm)
            }
        } catch (error) {
            console.log(error);
        }
    }


    async bookingWithWallet(req:Request,res:Response){
        try {
            const bookingDetails = req.body

             //user id for booking reference
             const token = req.cookies.userJWT
             let user
             if(token){
                 const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                 user = decoded.id
             }
             bookingDetails.user = user

            const bookingConfirm = await this.bookingUsecase.confirmBooking(bookingDetails)
            
            res.status(200).json(bookingConfirm)
        } catch (error) {
            console.log(error)
        }
    }

    async tableCounts(req:Request,res:Response){
        try {
            const guestData = req.body
            
            req.app.locals.guestData = guestData

            await this.session.sessionSetup(req,guestData);
            const sessionDetails = req.app.locals.guestData

            const seatCounts = await this.bookingUsecase.tableCounts(guestData.restaurantId,guestData.date,guestData.time)
            res.status(200).json({seatCounts,sessionDetails})
        } catch (error) {
            console.log(error);
        }
    }


    //payment
    async makePayment(req:Request,res:Response){
        try {
            const bookingDetails = req.body
            console.log(bookingDetails)
            
            //user id for booking reference
            const token = req.cookies.userJWT
            let user
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                user = decoded.id
            }
            bookingDetails.user = user
            
            req.app.locals = bookingDetails
            await this.session.sessionSetup(req,bookingDetails);
            // const sessionDetails = req.session
            const sessionDetails = req.app.locals.guestData

            const paymentDetails = await this.bookingUsecase.makePayment(bookingDetails)
            res.status(200).json(paymentDetails)
        } catch (error) {
            console.log(error)
        }
    }


    //user all bookings
    async userBookings(req:Request,res:Response){
        try {
            //user id for booking reference
            const token = req.cookies.userJWT
            let user
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                user = decoded.id
            }
            const bookings = await this.bookingUsecase.userBookings(user)
            res.status(200).json(bookings)
        } catch (error) {
            console.log(error)
        }
    }


    //user booking cancellation
    async userBookingCancellation(req:Request,res:Response){
        try {
            const bookingId = req.query.bookingId as string
            const {reason} = req.body
            const bookingStatus = await this.bookingUsecase.userBookingCancellation(bookingId,reason)
            res.status(200).json(bookingStatus)
        } catch (error) {
            console.log(error)
        }
    }



    //vendor
    //all booking details
    async allBookings(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const page = parseInt(req.query.page as string)

            const allBookingDetails = await this.bookingUsecase.allBookings(restaurantId,page)
            res.status(200).json(allBookingDetails)
        } catch (error) {
            console.log(error)
        }
    }


    //change booking status
    async changeBookingStatus(req:Request,res:Response){
        try {
            const bookingId = req.query.bookingId as string
            const {reason} = req.body
            console.log(reason)
            const bookingStatus = await this.bookingUsecase.changeBookingStatus(bookingId,reason)
            res.status(200).json(bookingStatus)
        } catch (error) {
            console.log(error)
        }
    }


     //sales chart
     async salesChart(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            console.log(restaurantId)
            const sales = await this.bookingUsecase.salesChart(restaurantId)
            res.status(200).json(sales)
        } catch (error) {
            console.log(error)
        }
    }


    //admin dashboard
    async adminDashboard(req:Request,res:Response){
        try {
            console.log('ger')
            const dashboard = await this.bookingUsecase.adminDashboard()
            res.status(200).json(dashboard)
        } catch (error) {
            console.log(error)
        }
    }
    

}

export default BookingController
