import Kitchen from "../../domain/kitchen";
import kitchenModel from "../database/KitchenModel";
import KitchenRepository from "../../usecase/interface/kitchenRepository";


class kitchenRepository implements KitchenRepository {
    async addItem(restaurantId: string, item: Kitchen) {
        const itemAdd = await kitchenModel.updateOne({ restaurantId }, { $push: { items: item } }, { upsert: true })
        return itemAdd
    }

    async viewItem(restaurantId: string) {
        const items = await kitchenModel.findOne({ restaurantId }).populate('items.category')
        return items
    }



    //User
    //viewing items for booking
    async allItems(restaurantId: string) {
        try {
            console.log(restaurantId)
            const result = await kitchenModel.findOne({restaurantId}).populate('items.category')
            // const groupedItems = result?.items.reduce((grouped, item) => {
            //     const category = item.category.category;
            //     if (!grouped[category]) {
            //         grouped[category] = [];
            //     }
            //     grouped[category].push(item);
            //     return grouped;
            // }, {});
            console.log(result)
            return result
        } catch (error) {
            console.log(error);
        }
    }





}

export default kitchenRepository