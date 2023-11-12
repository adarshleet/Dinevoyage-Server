import { Request,Response } from "express";
import KitchenUsecase from "../usecase/kitchenUsecase";


class KitchenController{
    private KitchenUsecase : KitchenUsecase

    constructor(KitchenUsecase:KitchenUsecase){
        this.KitchenUsecase = KitchenUsecase
    }


    async addItem(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const category = req.body.category 
            console.log(restaurantId,category)
            const itemAdd = await this.KitchenUsecase.addItem(restaurantId,category)
            console.log(itemAdd)
            res.status(200).json(itemAdd)
        } catch (error) {
            console.log(error)
        }
    }


    async viewItems(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const items = await this.KitchenUsecase.viewItem(restaurantId)
            console.log(items)
            res.json(items)
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default KitchenController