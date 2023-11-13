import { Request,Response } from "express";
import CategoryUsecase from "../usecase/categoryUsecase";


class CategoryContoller{
    private CategoryUsecase : CategoryUsecase

    constructor(CategoryUsecase:CategoryUsecase){
        this.CategoryUsecase = CategoryUsecase
    }


    async addCategory(req:Request,res:Response){
        try {
            const category = req.body.category
            const restaurantId = req.query.restaurantId as string
            const categoryAdd = await this.CategoryUsecase.addCategory(restaurantId,category)
            res.status(200).json(categoryAdd)
        } catch (error) {
            console.log(error);
        }
    }


    async editCategory(req:Request,res:Response){
        try {
            const category = req.body.category
            const categoryId = req.query.categoryId as string
            const categoryEdit = await this.CategoryUsecase.editCategory(categoryId,category)
            res.status(200).json(categoryEdit)
        } catch (error) {
           console.log(error);
        }
    }


    async changeCategoryStatus(req:Request,res:Response){
        try {
            const categoryId = req.query.categoryId as string
            const categoryStatus = await this.CategoryUsecase.changeCategoryStatus(categoryId)
            res.status(200).json(categoryStatus)

        } catch (error) {
            console.log(error)
        }
    }


    async allCategories(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const categories = await this.CategoryUsecase.allCategories(restaurantId)
            console.log(categories,restaurantId)
            res.status(200).json(categories)
        } catch (error) {
            console.log(error)
        }
    }

}


export default CategoryContoller