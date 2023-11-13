import Kitchen from "../../domain/kitchen";
import kitchenModel from "../database/KitchenModel";
import KitchenRepository from "../../usecase/interface/kitchenRepository";


class kitchenRepository implements KitchenRepository{
    async addItem(restaurantId: string, item: Kitchen) {
        const itemAdd = await kitchenModel.updateOne({restaurantId},{$push:{items:item}},{upsert:true})
        return itemAdd
    }

    async viewItem(restaurantId: string) {
        const items = await kitchenModel.findOne({restaurantId}).populate('items.category')
        return items
    }

}

export default kitchenRepository