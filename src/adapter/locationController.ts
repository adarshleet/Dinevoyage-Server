import { Request,Response } from "express";
import locationUsecase from "../usecase/locationUsecase";


class locationController{
    private locationUsecase : locationUsecase

    constructor(locationUsecase : locationUsecase){
        this.locationUsecase = locationUsecase
    }


    async addLocation(req:Request,res:Response){
        try {
            const {district,locality} = req.body
            const locationAdd = await this.locationUsecase.addLocation(district,locality)
            res.status(200).json(locationAdd)
        } catch (error) {
            console.log(error)
        }
    }


    async allLocality(req:Request,res:Response){
        try {
            const allLocality = await this.locationUsecase.allLocality()
            res.status(200).json(allLocality)
        } catch (error) {
            console.log(error);
        }
    }

}

export default locationController