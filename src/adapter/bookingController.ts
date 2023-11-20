import { Request,Response } from "express";
import BookingUsecase from "../usecase/bookingUsecase";
import Session from "../infrastructure/repository/session";


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
            const restaurantId = req.query.restaurantId as string
            const {time,date,table} = req.body
            console.log(restaurantId)
            const bookingConfirm = await this.bookingUsecase.confirmBooking(restaurantId,date,time,table)
            res.status(200).json(bookingConfirm)
        } catch (error) {
            console.log(error);
        }
    }


    async tableCounts(req:Request,res:Response){
        try {
            const guestData = req.body
            console.log(guestData)
            
            await this.session.sessionSetup(req,guestData);
            const sessionDetails = req.session
            console.log(sessionDetails)

            const seatCounts = await this.bookingUsecase.tableCounts(guestData.restaurantId,guestData.date,guestData.time)
            res.status(200).json({seatCounts,sessionDetails})
        } catch (error) {
            console.log(error);
        }
    }


    

}

export default BookingController
