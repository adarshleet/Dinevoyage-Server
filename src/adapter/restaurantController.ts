import { Request,Response } from "express";
import RestaurantUsecase from "../usecase/restaurantUsecase";
import jwt,{JwtPayload} from "jsonwebtoken";
import mongoose from "mongoose";

class restaurantController{
    private restaurantUsecase : RestaurantUsecase

    constructor(restaurantUsecase : RestaurantUsecase){
        this.restaurantUsecase = restaurantUsecase
    }


    async addRestaurant(req:Request,res:Response){
        try {
            const token = req.cookies.vendorJWT
            const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
            let vendorId = decoded.id

            const {restaurantName,landmark,locality,district,openingTime,closingTime,minCost,googlemapLocation,contactNumber,tableCounts} = req.body
            const banners = req.files
            const restaurantData = {
                vendorId:vendorId,
                restaurantName,
                landmark,
                locality,
                district,
                openingTime,
                closingTime,
                minCost,
                googlemapLocation,
                contactNumber,
                tableCounts,
                banners
            }

            const restaurantAdd = await this.restaurantUsecase.addRestaurant(restaurantData)
            console.log('statas',restaurantAdd)
            res.status(200).json(restaurantAdd);
            
        } catch (error) {
            console.log(error)
        }
    }


    async restaurantForVendor(req:Request,res:Response){
        try {
            const token = req.cookies.vendorJWT
            let vendorId
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                vendorId = decoded.id
            }

            const restaurant = await this.restaurantUsecase.vendorRestaurant(vendorId)
            console.log(restaurant)
            res.status(200).json(restaurant)

        } catch (error) {
            console.log(error)
        }
    }



    async restaurantRequests(req:Request,res:Response){
        try {
            const restaurantRequests = await this.restaurantUsecase.restaurantRequests()
            console.log(restaurantRequests)
            res.status(200).json(restaurantRequests)
        } catch (error) {
            console.log(error)
        }
    }
    

    //single restaurant request
    async singleRestaurantRequest(req:Request,res:Response){
        try {
            const restaurantId = req.params.id as string
            // console.log(restaurantId)
            const restaurantData = await this.restaurantUsecase.singleRestaurantRequest(restaurantId);
            // console.log(restaurantData)
            res.status(200).json(restaurantData)
        } catch (error) {
            console.log(error)
        }
    }


    //change restaurant status
    async changeRestaurantStatus(req:Request,res:Response){
        try {
            const id = req.query.id as string
            let status = parseInt(req.query.status as string)
            const restaurantStatus = await this.restaurantUsecase.changeRestaurantStatus(id,status)
            console.log(restaurantStatus)
            res.status(200).json(restaurantStatus)
        } catch (error) {
            console.log(error)
        }
    }


    //select restaurant cuisines by vendor
    async selectCuisines(req:Request,res:Response){
        try {
            const cuisines = req.body.cuisines
            const id = req.query.restaurantId as string
            const cuisinesSelected = await this.restaurantUsecase.selectCuisines(id,cuisines)
            res.status(200).json(cuisinesSelected)
        } catch (error) {
            console.log(error)
        }
    }



    //selected cuisines and facilities by restaurant
    async selectedCuisinesAndFacilities(req:Request,res:Response){
        try {
            let id
            const token = req.cookies.vendorJWT
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                id = decoded.id
            }
            console.log('here',id)
            const selectedCuisinesAndFacilities = await this.restaurantUsecase.selectedCuisinesAndFacilities(id)
            console.log(selectedCuisinesAndFacilities)
            res.status(200).json(selectedCuisinesAndFacilities)
        } catch (error) {
            console.log(error)
        }
    }


}

export default restaurantController