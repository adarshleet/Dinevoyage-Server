import Kitchen from "../domain/kitchen";
import KitchenRepository from "./interface/kitchenRepository";


class KitchenUsecase {
    private KitchenRepository: KitchenRepository

    constructor(KitchenRepository: KitchenRepository) {
        this.KitchenRepository = KitchenRepository
    }


    async addItem(restauarantId: string, item: Kitchen) {
        try {
            const itemAdd = await this.KitchenRepository.addItem(restauarantId, item)
            return {
                status: 200,
                data: itemAdd
            }
        } catch (error) {
            console.log(error)
        }
    }


    async viewItem(restaurantId: string) {
        try {
            const viewItems = await this.KitchenRepository.viewItem(restaurantId)
            return {
                status: 200,
                data: viewItems
            }
        } catch (error) {
            console.log(error)
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


    async allKitchenItems(restauarantId:string){
        try {
            const kitchenAllItems = await this.KitchenRepository.kitchenAllItems(restauarantId)
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