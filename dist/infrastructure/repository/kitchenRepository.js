"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const KitchenModel_1 = __importDefault(require("../database/KitchenModel"));
const mongoose_1 = require("mongoose");
class kitchenRepository {
    addItem(restaurantId, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemAdd = yield KitchenModel_1.default.updateOne({ restaurantId }, { $push: { items: item } }, { upsert: true });
            return itemAdd;
        });
    }
    viewItem(restaurantId, searchQuery, page) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = 5;
                const skip = (page - 1) * limit;
                const result = yield KitchenModel_1.default.aggregate([
                    { $match: { restaurantId: new mongoose_1.Types.ObjectId(restaurantId) } },
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
                const totalCount = ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.items.length) || 0;
                const totalPages = Math.ceil(totalCount / limit);
                const items = ((_b = result[0]) === null || _b === void 0 ? void 0 : _b.items.slice(skip, skip + limit)) || [];
                return {
                    items,
                    totalCount,
                    totalPages,
                    currentPage: page,
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editItem(itemId, itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //if no image selected. assigning old image
                if (!itemData.image) {
                    const item = yield KitchenModel_1.default.findOne({ 'items._id': itemId }, { 'items.$': 1, _id: 0 });
                    if (item && item.items.length > 0) {
                        const image = item.items[0].image;
                        itemData.image = image;
                    }
                }
                const itemEditStatus = yield KitchenModel_1.default.updateOne({ 'items._id': itemId }, { $set: { 'items.$': itemData } });
                return itemEditStatus;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    changeItemStatus(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield KitchenModel_1.default.findOne({ 'items._id': itemId }, { 'items.$': 1, _id: 0 });
                let status;
                if (item && item.items.length > 0) {
                    status = item.items[0].isListed;
                }
                const itemStatus = yield KitchenModel_1.default.updateOne({ 'items._id': itemId }, { $set: { 'items.$.isListed': !status } });
                return itemStatus;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //User
    //viewing items for booking
    allItems(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(restaurantId);
                const result = yield KitchenModel_1.default.findOne({ restaurantId }).populate('items.category');
                console.log(result);
                return result;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //in the booking page
    kitchenAllItems(restaurantId, veg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query;
                if (veg == true) {
                    query = {
                        $match: {
                            "items.isListed": true,
                            "items.veg": veg
                        }
                    };
                }
                else {
                    query = {
                        $match: {
                            "items.isListed": true
                        }
                    };
                }
                const allKitchenItems = yield KitchenModel_1.default.aggregate([
                    {
                        $match: {
                            "restaurantId": new mongoose_1.Types.ObjectId(restaurantId)
                        }
                    },
                    {
                        $unwind: "$items"
                    },
                    query,
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
                ]);
                return allKitchenItems;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = kitchenRepository;
