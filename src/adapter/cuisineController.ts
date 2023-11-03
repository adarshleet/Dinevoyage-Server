import { Request,Response } from "express";
import CuisineUseCase from "../usecase/cuisineUsecase";

class cusineController{
    private cuisineUsecase : CuisineUseCase

    constructor(cuisineUsecase : CuisineUseCase){
        this.cuisineUsecase = cuisineUsecase
    }

    async addFacility(req:Request,res:Response){
        try {
            const facility = req.body.facility
            const facilityStatus = await this.cuisineUsecase.addFacility(facility)
            console.log(facilityStatus)
            res.status(200).json(facilityStatus)
        } catch (error) {
            console.log(error);
        }
    } 


    async allFacilities(req:Request,res:Response){
        try {
            const facilities = await this.cuisineUsecase.allFacilities()
            res.status(200).json(facilities?.data[0].facilities)
        } catch (error) {
            console.log(error)
        }
    }


    async addCuisine(req:Request,res:Response){
        try {
            const cuisine = req.body.cuisine
            const cuisineStatus = await this.cuisineUsecase.addCuisine(cuisine)
            res.status(200).json(cuisineStatus)
        } catch (error) {
            console.log(error);
        }
    }


    async allCuisines(req:Request,res:Response){
        try {
            const cuisines = await this.cuisineUsecase.allCuisines()
            res.status(200).json(cuisines?.data[0].cuisines)
        } catch (error) {
            console.log(error);
        }
    }



}

export default cusineController