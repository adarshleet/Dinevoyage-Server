import { Request,Response } from "express";
import RestaurantUsecase from "../usecase/restaurantUsecase";
import jwt,{Secret} from "jsonwebtoken";

class restaurantController{
    private restaurantUsecase : RestaurantUsecase

    constructor(restaurantUsecase : RestaurantUsecase){
        this.restaurantUsecase = restaurantUsecase
    }


    async addRestaurant(req:Request,res:Response){
        try {
            // console.log('here')
            // const token = req.cookies.vendorJWT
            // if (token) {
            //     const decoded = jwt.verify(token, process.env.JWT_KEY as string);
            //     console.log(decoded);
            // }
            const {restaurantName,landmark,locality,district,openingTime,closingTime,minCoast,googlemapLocation,contactNumber,tableCounts} = req.body
            const banners = req.files
            const restaurantData = {
                restaurantName,
                landmark,
                locality,
                district,
                openingTime,
                closingTime,
                minCoast,
                googlemapLocation,
                contactNumber,
                tableCounts,
                banners
            }

            const restaurantAdd = this.restaurantUsecase.addRestaurant(restaurantData)
            res.status(200).json(restaurantAdd)
            
            
        } catch (error) {
            console.log(error)
        }
    }

}

export default restaurantController