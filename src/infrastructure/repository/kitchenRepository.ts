import Kitchen from "../../domain/kitchen";
import kitchenModel from "../database/KitchenModel";
import KitchenRepository from "../../usecase/interface/kitchenRepository";
import { Types } from 'mongoose';


class kitchenRepository implements KitchenRepository {
    async addItem(restaurantId: string, item: Kitchen) {
        const itemAdd = await kitchenModel.updateOne({ restaurantId }, { $push: { items: item } }, { upsert: true })
        return itemAdd
    }

    async viewItem(restaurantId: string, searchQuery: string, page: number) {
        try {
            const limit = 5;
            const skip = (page - 1) * limit;

            const result = await kitchenModel.aggregate([
                { $match: { restaurantId:new Types.ObjectId(restaurantId) } },
                { $unwind: '$items' },
                { $match: { 'items.itemName': { $regex: `^${searchQuery}`, $options: 'i' } } },
                { $lookup: { from: 'categories', localField: 'items.category', foreignField: '_id', as: 'items.category' } },
                {
                    $group: {
                      _id: '$restaurantId',
                      items: { $push: '$items' },
                    },
                },
              ]);


            const totalCount = result[0]?.items.length || 0;
            const totalPages = Math.ceil(totalCount / limit);
            const items = result[0]?.items.slice(skip, skip + limit) || [];

            return {
                items,
                totalCount,
                totalPages,
                currentPage: page,
            };
        } catch (error) {
            console.log(error);
        }
    }


    async editItem(itemId: string, itemData: Kitchen) {
        try {
            //if no image selected. assigning old image
            if (!itemData.image) {
                const item = await kitchenModel.findOne({ 'items._id': itemId }, { 'items.$': 1, _id: 0 }) as { items: [{ image: string }] }
                if (item && item.items.length > 0) {
                    const image = item.items[0].image;
                    itemData.image = image;
                }
            }
            const itemEditStatus = await kitchenModel.updateOne({ 'items._id': itemId }, { $set: { 'items.$': itemData } })
            console.log('here')

            return itemEditStatus
        } catch (error) {
            console.log(error)
        }
    }


    async changeItemStatus(itemId: string) {
        try {
            const item = await kitchenModel.findOne({ 'items._id': itemId }, { 'items.$': 1, _id: 0 }) as { items: [{ isListed: boolean }] }
            let status
            if (item && item.items.length > 0) {
                status = item.items[0].isListed;
            }

            const itemStatus = await kitchenModel.updateOne({ 'items._id': itemId }, { $set: { 'items.$.isListed': !status } })
            return itemStatus

        } catch (error) {
            console.log(error)
        }
    }


    //User
    //viewing items for booking
    async allItems(restaurantId: string) {
        try {
            console.log(restaurantId)
            const result = await kitchenModel.findOne({ restaurantId }).populate('items.category')

            console.log(result)
            return result
        } catch (error) {
            console.log(error);
        }
    }


    //in the booking page
    async kitchenAllItems(restaurantId: string, veg: boolean) {
        try {

            let query

            if (veg == true) {
                query = {
                    $match: {
                        "items.isListed": true,
                        "items.veg": veg
                    }
                }
            }
            else {
                query = {
                    $match: {
                        "items.isListed": true
                    }
                }
            }

            const allKitchenItems = await kitchenModel.aggregate([
                {
                    $match: {
                        "restaurantId": new Types.ObjectId(restaurantId)
                    }
                },
                {
                    $unwind: "$items"
                },
                query
                ,
                {
                    $group: {
                        _id: "$items.category",
                        items: {
                            $push: {
                                itemName: "$items.itemName",
                                price: "$items.price",
                                description: "$items.description",
                                image: "$items.image",
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
                    $match: {
                        "categoryDetails.isListed": true
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
        } catch (error) {
            console.log(error);
        }
    }





}

export default kitchenRepository