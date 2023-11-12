import kitchenModel from "../database/KitchenModel";
import KitchenRepository from "../../usecase/interface/kitchenRepository";


class kitchenRepository implements KitchenRepository{
    async addItem(restaurantId: string, category: string) {
        const itemAdd = await kitchenModel.updateOne({restaurantId},{$push:{items:{category}}},{upsert:true})
        return itemAdd
    }

    async viewItem(restaurantId: string) {
        const items = await kitchenModel.find({restaurantId})
        return items
    }

}

export default kitchenRepository