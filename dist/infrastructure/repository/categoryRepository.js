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
const categoryModel_1 = __importDefault(require("../database/categoryModel"));
class categoryRepository {
    addCategory(restaurantId, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryFound = yield categoryModel_1.default.findOne({ category });
            if (categoryFound) {
                return false;
            }
            const categoryToAdd = new categoryModel_1.default({
                restaurantId,
                category
            });
            const categoryAdd = categoryToAdd.save();
            return categoryAdd;
        });
    }
    editCategory(categoryId, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryFound = yield categoryModel_1.default.findOne({ category });
            if (categoryFound) {
                return false;
            }
            const categoryEdit = yield categoryModel_1.default.findByIdAndUpdate(categoryId, { $set: { category } }, { new: true });
            return categoryEdit;
        });
    }
    changeCategoryStatus(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categoryModel_1.default.findById(categoryId);
            if (category) {
                const newStatus = !category.isListed;
                const categoryStatus = yield categoryModel_1.default.findByIdAndUpdate(categoryId, { $set: { isListed: newStatus } }, { new: true });
                return categoryStatus;
            }
        });
    }
    viewCategories(restaurantId, search, page) {
        return __awaiter(this, void 0, void 0, function* () {
            //for getting all categories for kitchen
            if (page == -1) {
                const categories = yield categoryModel_1.default.find({ restaurantId });
                return categories;
            }
            const limit = 5;
            const categories = yield categoryModel_1.default.find({ restaurantId, category: { $regex: `^${search}`, $options: 'i' } }).skip((page - 1) * limit).limit(limit);
            const totalCount = yield categoryModel_1.default.find({ restaurantId, category: { $regex: `^${search}`, $options: 'i' } }).countDocuments();
            return {
                categories,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page
            };
        });
    }
}
exports.default = categoryRepository;
