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
            const item = req.body.itemData
            const itemAdd = await this.KitchenUsecase.addItem(restaurantId,item)
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
            res.status(200).json(items)
        } catch (error) {
            console.log(error);
            
        }
    }



    //User
    //all kitchen items for ordering
    async allItems(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const kitchenItems = await this.KitchenUsecase.allItems(restaurantId)
            res.status(200).json(kitchenItems)
        } catch (error) {
            console.log(error);
        }
    }


}

export default KitchenController