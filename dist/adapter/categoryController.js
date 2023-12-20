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
class CategoryContoller {
    constructor(CategoryUsecase) {
        this.CategoryUsecase = CategoryUsecase;
    }
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = req.body.category;
                const restaurantId = req.query.restaurantId;
                const categoryAdd = yield this.CategoryUsecase.addCategory(restaurantId, category);
                res.status(200).json(categoryAdd);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = req.body.category;
                const categoryId = req.query.categoryId;
                const categoryEdit = yield this.CategoryUsecase.editCategory(categoryId, category);
                res.status(200).json(categoryEdit);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    changeCategoryStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.query.categoryId;
                const categoryStatus = yield this.CategoryUsecase.changeCategoryStatus(categoryId);
                res.status(200).json(categoryStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    allCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                const search = req.query.search;
                const page = parseInt(req.query.page);
                const categories = yield this.CategoryUsecase.allCategories(restaurantId, search, page);
                console.log(categories, restaurantId);
                res.status(200).json(categories);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = CategoryContoller;
