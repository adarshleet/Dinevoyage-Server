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
            const item = req.body
            const image = req.file
            
            item.veg = item.veg == 'true' ? true : false
            item.image = image
        
            const itemAdd = await this.KitchenUsecase.addItem(restaurantId,item)
            res.status(200).json(itemAdd)

        } catch (error) {
            console.log(error)
        }
    }


    async viewItems(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const searchQuery = req.query.search as string || ''
            const page = parseInt(req.query.page as string) || 1

            const items = await this.KitchenUsecase.viewItem(restaurantId,searchQuery,page)
            res.status(200).json(items)
        } catch (error) {
            console.log(error);
            
        }
    }



    //edit items
    async editItem(req:Request,res:Response){
        try {
            const itemId = req.query.itemId as string
            const itemData = req.body
            const image = req.file

            delete itemData.image
            
            const itemEditStatus = await this.KitchenUsecase.editItem(itemId,itemData,image)
            console.log(itemEditStatus)
            res.status(200).json(itemEditStatus)
        

        } catch (error) {
            console.log(error)
        }
    }

    //get item
    async changeItemStatus(req:Request,res:Response){
        try {
            const itemId = req.query.itemId as string
            const item = await this.KitchenUsecase.changeItemStatus(itemId)
            res.status(200).json(item)
        } catch (error) {
            console.log(error)
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


    //for booking page
    async allKitchenItems(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const vegString = req.query.veg as string
            let veg = false
            if(vegString == 'true'){
                veg = true
            }
            const kitchenAllItems = await this.KitchenUsecase.allKitchenItems(restaurantId,veg)
            // session data of guests
            const sessionData = req.session
            res.status(200).json({kitchenAllItems,sessionData})
        } catch (error) {
            console.log(error)
        }
    }

}

export default KitchenController