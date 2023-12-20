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
Object.defineProperty(exports, "__esModule", { value: true });
class KitchenUsecase {
    constructor(KitchenRepository, cloudinary) {
        this.KitchenRepository = KitchenRepository;
        this.cloudinary = cloudinary;
    }
    addItem(restauarantId, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                item.image = yield this.cloudinary.saveToCloudinary(item.image);
                const itemAdd = yield this.KitchenRepository.addItem(restauarantId, item);
                item.image = itemAdd;
                return {
                    status: 200,
                    data: itemAdd
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    viewItem(restaurantId, searchQuery, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const viewItems = yield this.KitchenRepository.viewItem(restaurantId, searchQuery, page);
                return {
                    status: 200,
                    data: viewItems
                };
            }
            catch (error) {
                return {
                    status: 400,
                    data: error
                };
            }
        });
    }
    //edit item details
    editItem(itemId, itemData, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (image) {
                    itemData.image = yield this.cloudinary.saveToCloudinary(image);
                }
                const itemEditStatus = yield this.KitchenRepository.editItem(itemId, itemData);
                return {
                    status: 200,
                    data: itemEditStatus
                };
            }
            catch (error) {
                return {
                    status: 400,
                    data: error
                };
            }
        });
    }
    changeItemStatus(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.KitchenRepository.changeItemStatus(itemId);
                return {
                    status: 200,
                    data: item
                };
            }
            catch (error) {
                return {
                    status: 400,
                    data: error
                };
            }
        });
    }
    //User
    //viewing items for ordering
    allItems(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const kitchenItems = yield this.KitchenRepository.allItems(restaurantId);
                return {
                    status: 200,
                    data: kitchenItems
                };
            }
            catch (error) {
                return {
                    status: 400,
                    data: error
                };
            }
        });
    }
    allKitchenItems(restauarantId, veg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const kitchenAllItems = yield this.KitchenRepository.kitchenAllItems(restauarantId, veg);
                return {
                    status: 200,
                    data: kitchenAllItems
                };
            }
            catch (error) {
                return {
                    status: 400,
                    data: error
                };
            }
        });
    }
}
exports.default = KitchenUsecase;
