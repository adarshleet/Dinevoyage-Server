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



    async editFacility(req:Request,res:Response){
        try {
            const index = parseInt(req.query.index as string)
            const facility = req.query.facility as string
            const facilityEdit = await this.cuisineUsecase.editFacility(facility,index)
            res.status(200).json(facilityEdit)
        } catch (error) {
            console.log(error)
        }
    }


    async deleteFacility(req:Request,res:Response){
        try {
            const facility = req.query.facility as string
            const facilityDelete = await this.cuisineUsecase.deleteFacility(facility)
            res.status(200).json(facilityDelete)
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

    async editCuisine(req:Request,res:Response){
        try {
            const index = parseInt(req.query.index as string)
            const cuisine = req.query.cuisine as string
            const cuisineEdit = await this.cuisineUsecase.editCuisine(cuisine,index)
            res.status(200).json(cuisineEdit)
        } catch (error) {
            console.log(error)
        }
    }


    async deleteCuisine(req:Request,res:Response){
        try {
            const cuisine = req.query.cuisine as string
            const cuisineDelete = await this.cuisineUsecase.deleteCuisine(cuisine)
            console.log(cuisineDelete)
            res.status(200).json(cuisineDelete)
        } catch (error) {
            console.log(error)
        }
    }



}

export default cusineController