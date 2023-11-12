import KitchenRepository from "./interface/kitchenRepository";


class KitchenUsecase{
    private KitchenRepository : KitchenRepository

    constructor(KitchenRepository:KitchenRepository){
        this.KitchenRepository = KitchenRepository
    }


    async addItem(restauarantId:string,category:string){
        try {
            const itemAdd = await this.KitchenRepository.addItem(restauarantId,category)
            return{
                status:200,
                data:itemAdd
            }
        } catch (error) {
            console.log(error)
        }
    }


    async viewItem(restaurantId:string){
        try {
            const viewItems = await this.KitchenRepository.viewItem(restaurantId)
            return{
                status:200,
                data:viewItems
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default KitchenUsecase