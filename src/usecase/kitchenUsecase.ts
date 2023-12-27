import Kitchen from "../domain/kitchen";
import KitchenRepository from "./interface/kitchenRepository";
import Cloudinary from "../infrastructure/utils/cloudinary";


class KitchenUsecase {
    private KitchenRepository: KitchenRepository
    private cloudinary : Cloudinary

    constructor(KitchenRepository: KitchenRepository,cloudinary : Cloudinary) {
        this.KitchenRepository = KitchenRepository
        this.cloudinary = cloudinary
    }


    async addItem(restauarantId: string, item: Kitchen) {
        try {

            item.image = await this.cloudinary.saveToCloudinary(item.image);

            const itemAdd = await this.KitchenRepository.addItem(restauarantId, item)
            item.image = itemAdd
            return {
                status: 200,
                data: itemAdd
            }
        } catch (error) {
            console.log(error)
        }
    }


    async viewItem(restaurantId: string,searchQuery:string,page:number) {
        try {
            const viewItems = await this.KitchenRepository.viewItem(restaurantId,searchQuery,page)
            return {
                status: 200,
                data: viewItems
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    //edit item details
    async editItem(itemId:string,itemData:Kitchen,image:Object|undefined){
        try {
            if(image){
                itemData.image = await this.cloudinary.saveToCloudinary(image);
            }
            console.log(itemId)
            const itemEditStatus = await this.KitchenRepository.editItem(itemId,itemData)
            return{
                status:200,
                data:itemEditStatus
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    async changeItemStatus(itemId:string){
        try {
            const item = await this.KitchenRepository.changeItemStatus(itemId)
            return{
                status:200,
                data:item
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    //User
    //viewing items for ordering
    async allItems(restaurantId: string) {
        try {
            const kitchenItems = await this.KitchenRepository.allItems(restaurantId)
            return{
                status:200,
                data:kitchenItems
            }
        } catch (error) {
            return {
                status: 400,
                data:error
            }
        }
    }


    async allKitchenItems(restauarantId:string,veg:boolean){
        try {
            const kitchenAllItems = await this.KitchenRepository.kitchenAllItems(restauarantId,veg)
            return{
                status:200,
                data:kitchenAllItems
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }
}

export default KitchenUsecase