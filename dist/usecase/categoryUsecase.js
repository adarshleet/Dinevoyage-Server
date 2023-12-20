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
class CategoryUsecase {
    constructor(CategoryRepository) {
        this.CategoryRepository = CategoryRepository;
    }
    addCategory(restaurantId, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryAdd = yield this.CategoryRepository.addCategory(restaurantId, category);
                return {
                    status: 200,
                    data: categoryAdd
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    changeCategoryStatus(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryStatus = yield this.CategoryRepository.changeCategoryStatus(categoryId);
                return {
                    status: 200,
                    data: categoryStatus
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editCategory(categoryId, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryEdit = yield this.CategoryRepository.editCategory(categoryId, category);
                return {
                    status: 200,
                    data: categoryEdit
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    allCategories(restaurantId, search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.CategoryRepository.viewCategories(restaurantId, search, page);
                return {
                    status: 200,
                    data: categories
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = CategoryUsecase;
