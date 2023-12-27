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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurantModel_1 = __importDefault(require("../database/restaurantModel"));
const KitchenModel_1 = __importDefault(require("../database/KitchenModel"));
class restaurantRepository {
    addRestaurant(restaurantData) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = new restaurantModel_1.default(restaurantData);
            const restaurantRequest = yield restaurant.save();
            return restaurantRequest;
        });
    }
    vendorRestaurant(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = yield restaurantModel_1.default.find({ vendorId });
            return restaurant;
        });
    }
    //taking restaurants requests for admin
    restaurantRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurantRequests = yield restaurantModel_1.default.find({ status: { $lt: 3 } }).populate('vendorId');
            return restaurantRequests;
        });
    }
    //single restaurant request full details
    singleRestaurantRequest(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurantDetails = yield restaurantModel_1.default.findById(restaurantId);
            return restaurantDetails;
        });
    }
    //change restaurant status
    changeRestaurantStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurantStatus = yield restaurantModel_1.default.findByIdAndUpdate(id, { $set: { status } }, { new: true });
            return restaurantStatus;
        });
    }
    //selecting restauarant cuisines by vendor
    selectRestaurantCuisines(id, selectedCuisines) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuisineSelect = yield restaurantModel_1.default.findOneAndUpdate({ _id: id }, { $set: { cuisines: selectedCuisines } }, { new: true });
            return cuisineSelect;
        });
    }
    //selecting restaurant facilities by vendor
    selectRestaurantFacilities(id, selectedFacilities) {
        return __awaiter(this, void 0, void 0, function* () {
            const facilitySelect = yield restaurantModel_1.default.findOneAndUpdate({ _id: id }, { $set: { facilities: selectedFacilities } }, { new: true });
            return facilitySelect;
        });
    }
    //already selected cuisines for showing
    selectedCuisinesAndFacilities(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedCuisines = yield restaurantModel_1.default.find({ vendorId: id, status: { $gt: 3 } });
            return selectedCuisines;
        });
    }
    getRestaurantDetails(restauarantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restauarantDetails = yield restaurantModel_1.default.findOne({ _id: restauarantId });
                return restauarantDetails;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //remove restaurant banner
    removeRestaurantBanner(restauarantId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeBanner = yield restaurantModel_1.default.findByIdAndUpdate(restauarantId, { $pull: { banners: image } });
                return removeBanner;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //edit restaurant details
    editRestaurant(restaurantId, restaurantDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { banners } = restaurantDetails, restDetailsWithoutBanners = __rest(restaurantDetails, ["banners"]);
                if (!banners) {
                    banners = [];
                }
                const editedRestauarantStatus = yield restaurantModel_1.default.findByIdAndUpdate(restaurantId, { $set: Object.assign({}, restDetailsWithoutBanners),
                    $push: { banners: { $each: banners } } }, { new: true });
                return editedRestauarantStatus;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //user
    //search restaurants
    searchRestaurant(searchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantIds = yield KitchenModel_1.default.find({
                    items: { $exists: true, $not: { $size: 0 } }
                }, { restaurantId: 1, _id: 0 });
                const restaurantIdStrings = restaurantIds.map((res) => { var _a; return (_a = res.restaurantId) === null || _a === void 0 ? void 0 : _a.toString(); });
                const searchResults = yield restaurantModel_1.default.find({
                    _id: { $in: restaurantIdStrings },
                    $or: [
                        { restaurantName: { $regex: searchQuery, $options: 'i' } },
                        { locality: { $regex: searchQuery, $options: 'i' } },
                        { landmark: { $regex: searchQuery, $options: 'i' } },
                        { district: { $regex: searchQuery, $options: 'i' } },
                    ],
                });
                return searchResults;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    filterRestaurant(cuisines, facilities, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantIds = yield KitchenModel_1.default.find({
                    items: { $exists: true, $not: { $size: 0 } }
                }, { restaurantId: 1, _id: 0 });
                const restaurantIdStrings = restaurantIds.map((res) => { var _a; return (_a = res.restaurantId) === null || _a === void 0 ? void 0 : _a.toString(); });
                const limit = 3;
                let filterResult, totalPages;
                if (!cuisines.length && !facilities.length) {
                    filterResult = yield restaurantModel_1.default.find({
                        _id: { $in: restaurantIdStrings }
                    }).skip((page - 1) * limit).limit(limit);
                    const totalCount = yield restaurantModel_1.default.find({
                        _id: { $in: restaurantIdStrings }
                    }).countDocuments();
                    totalPages = Math.floor(totalCount / limit);
                }
                else {
                    filterResult = yield restaurantModel_1.default.find({
                        _id: { $in: restaurantIdStrings },
                        $or: [
                            { cuisines: { $all: cuisines } },
                            { facilities: { $all: facilities } },
                        ],
                    }).skip((page - 1) * limit).limit(limit);
                    const totalCount = yield restaurantModel_1.default.find({
                        _id: { $in: restaurantIdStrings },
                        $or: [
                            { cuisines: { $all: cuisines } },
                            { facilities: { $all: facilities } },
                        ],
                    }).countDocuments();
                    totalPages = Math.floor(totalCount / limit);
                }
                return {
                    filterResult,
                    totalPages
                };
            }
            catch (error) {
                console.log(error);
                // Handle the error appropriately, e.g., throw or return an error message
            }
        });
    }
    popularRestaurants() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const popularRestaurants = yield restaurantModel_1.default.find({ status: 4 }).sort({ createdAt: -1 }).limit(3);
                return popularRestaurants;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = restaurantRepository;
