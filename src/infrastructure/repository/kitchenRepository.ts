import Kitchen from "../../domain/kitchen";
import kitchenModel from "../database/KitchenModel";
import KitchenRepository from "../../usecase/interface/kitchenRepository";
import { Types } from 'mongoose';


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


    //in the booking page
    async kitchenAllItems(restaurantId: string) {
        try {
            const allKitchenItems = await kitchenModel.aggregate([
                {
                  $match: {
                    "restaurantId": new Types.ObjectId(restaurantId)
                  }
                },
                {
                  $unwind: "$items"
                },
                {
                  $match: {
                    "items.isListed": true,
                  }
                },
                {
                  $group: {
                    _id: "$items.category",
                    items: {
                      $push: {
                        itemName: "$items.itemName",
                        price: "$items.price",
                        description: "$items.description",
                        _id: "$items._id"
                      }
                    }
                  }
                },
                {
                  $lookup: {
                    from: "categories", // Replace with your actual collection name
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryDetails"
                  }
                },
                {
                  $unwind: "$categoryDetails"
                },
                {
                    $match:{
                        "categoryDetails.isListed" : true
                    }
                },
                {
                  $project: {
                    _id: 0,
                    category: "$categoryDetails.category",
                    items: 1
                  }
                }
              ])
              return allKitchenItems
              console.log(allKitchenItems)
        } catch (error) {
            console.log(error);
        }
    }





}

export default kitchenRepository