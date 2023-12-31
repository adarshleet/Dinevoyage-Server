import { Request,Response } from "express";
import RestaurantUsecase from "../usecase/restaurantUsecase";
import jwt,{JwtPayload} from "jsonwebtoken";

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

            const {restaurantName,landmark,locality,location,district,openingTime,closingTime,minCost,googlemapLocation,contactNumber,tableCounts} = req.body
            const banners = req.files
            const restaurantData = {
                vendorId:vendorId,
                restaurantName,
                landmark,
                locality,
                location,
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
            res.status(200).json(restaurant)

        } catch (error) {
            console.log(error)
        }
    }



    async restaurantRequests(req:Request,res:Response){
        try {
            const restaurantRequests = await this.restaurantUsecase.restaurantRequests()
            res.status(200).json(restaurantRequests)
        } catch (error) {
            console.log(error)
        }
    }
    

    //single restaurant request
    async singleRestaurantRequest(req:Request,res:Response){
        try {
            const restaurantId = req.params.id as string
            const restaurantData = await this.restaurantUsecase.singleRestaurantRequest(restaurantId);
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


    //select restaurant facilities by vendor
    async selectFacilities(req:Request,res:Response){
        try {
            const facilities = req.body.facilities
            const id = req.query.restaurantId as string
            const facilitiesSelected = await this.restaurantUsecase.selectFacilities(id,facilities)
            res.status(200).json(facilitiesSelected)
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
            const selectedCuisinesAndFacilities = await this.restaurantUsecase.selectedCuisinesAndFacilities(id)
            res.status(200).json(selectedCuisinesAndFacilities)
        } catch (error) {
            console.log(error)
        }
    }


    async getRestaurantDetails(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const restauarantDetails = await this.restaurantUsecase.getRestaurantDetails(restaurantId)
            res.status(200).json(restauarantDetails)
        } catch (error) {
            console.log(error)
        }
    }


    //remove banner
    async removeRestaurantBanner(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const image = req.query.image as string
            const removeBanner = await this.restaurantUsecase.removeRestaurantBanner(restaurantId,image)
            res.status(200).json(removeBanner)

        } catch (error) {
            console.log(error)
        }
    }



    //edit restaurant details
    async editRestaurant(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            let restauarantDetails = req.body
            const banners =  req.files
            restauarantDetails.banners = banners
            const editedRestauarantStatus = await this.restaurantUsecase.editRestaurant(restaurantId,restauarantDetails)
            res.status(200).json(editedRestauarantStatus)
        } catch (error) {
            console.log(error)
        }
    }



   


    //user
    //search restaurants
    async searchRestaurants(req:Request,res:Response){
        try {
            const searchQuery = req.query.search as string
            const searchResults = await this.restaurantUsecase.searchRestaurants(searchQuery)
            res.status(200).json(searchResults)
        } catch (error) {
            console.log(error)
        }
    }

    //filter restaurants
    async filterRestaurants(req:Request,res:Response){
        try {
            const {cuisines,facilities} = req.body
            const page = parseInt(req.query.page as string)
            const restauarants = await this.restaurantUsecase.filterRestaurants(cuisines,facilities,page)
            res.status(200).json(restauarants)
        } catch (error) {
            console.log(error)
        }
    }


    //newest popular restaurants
    async popularRestaurants(req:Request,res:Response){
        try {
            const popularRestaurants = await this.restaurantUsecase.popularRestaurants()
            res.status(200).json(popularRestaurants)
        } catch (error) {
            console.log(error)
        }
    }


}

export default restaurantController