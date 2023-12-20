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
class KitchenController {
    constructor(KitchenUsecase) {
        this.KitchenUsecase = KitchenUsecase;
    }
    addItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                const item = req.body;
                const image = req.file;
                item.veg = item.veg == 'true' ? true : false;
                item.image = image;
                const itemAdd = yield this.KitchenUsecase.addItem(restaurantId, item);
                res.status(200).json(itemAdd);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    viewItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                const searchQuery = req.query.search || '';
                const page = parseInt(req.query.page) || 1;
                const items = yield this.KitchenUsecase.viewItem(restaurantId, searchQuery, page);
                res.status(200).json(items);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //edit items
    editItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemId = req.query.itemId;
                const itemData = req.body;
                const image = req.file;
                delete itemData.image;
                const itemEditStatus = yield this.KitchenUsecase.editItem(itemId, itemData, image);
                res.status(200).json(itemEditStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //get item
    changeItemStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemId = req.query.itemId;
                const item = yield this.KitchenUsecase.changeItemStatus(itemId);
                res.status(200).json(item);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //User
    //all kitchen items for ordering
    allItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                const kitchenItems = yield this.KitchenUsecase.allItems(restaurantId);
                res.status(200).json(kitchenItems);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //for booking page
    allKitchenItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                const vegString = req.query.veg;
                let veg = false;
                if (vegString == 'true') {
                    veg = true;
                }
                const kitchenAllItems = yield this.KitchenUsecase.allKitchenItems(restaurantId, veg);
                // session data of guests
                const sessionData = req.session;
                res.status(200).json({ kitchenAllItems, sessionData });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = KitchenController;
