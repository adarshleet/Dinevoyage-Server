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
class RestaurantUsecase {
    constructor(restaurantRepository, cloudinary) {
        this.restaurantRepository = restaurantRepository;
        this.cloudinary = cloudinary;
    }
    addRestaurant(restaurantData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uploadedBanners = yield Promise.all(restaurantData.banners.map((file) => __awaiter(this, void 0, void 0, function* () {
                    return yield this.cloudinary.saveToCloudinary(file);
                })));
                restaurantData.banners = uploadedBanners;
                const restaurantStatus = yield this.restaurantRepository.addRestaurant(restaurantData);
                return {
                    status: 200,
                    success: true,
                    data: restaurantStatus
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    vendorRestaurant(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurant = yield this.restaurantRepository.vendorRestaurant(vendorId);
                return {
                    status: 200,
                    data: restaurant
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    restaurantRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantRequests = yield this.restaurantRepository.restaurantRequests();
                return {
                    status: 200,
                    data: restaurantRequests
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //single restaurant request
    singleRestaurantRequest(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantData = yield this.restaurantRepository.singleRestaurantRequest(restaurantId);
                return {
                    status: 200,
                    data: restaurantData
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //change restaurant status
    changeRestaurantStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantStatus = yield this.restaurantRepository.changeRestaurantStatus(id, status);
                return {
                    status: 200,
                    data: restaurantStatus
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //changing restaurant cuisines by vendor
    selectCuisines(id, cuisines) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectedCuisines = yield this.restaurantRepository.selectRestaurantCuisines(id, cuisines);
                return {
                    status: 200,
                    data: selectedCuisines
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //changing restaurant facilities by vendor
    selectFacilities(id, facilities) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectedFacilities = yield this.restaurantRepository.selectRestaurantFacilities(id, facilities);
                return {
                    status: 200,
                    data: selectedFacilities
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //already selected cuisines and facilities
    selectedCuisinesAndFacilities(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectedCuisinesAndFacilities = yield this.restaurantRepository.selectedCuisinesAndFacilities(id);
                return {
                    status: 200,
                    data: selectedCuisinesAndFacilities
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
    //restauarnt details for editing
    getRestaurantDetails(restauarantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restauarantDetails = yield this.restaurantRepository.getRestaurantDetails(restauarantId);
                return {
                    status: 200,
                    data: restauarantDetails
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
    //remove banner
    removeRestaurantBanner(restaurantId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeBanner = this.restaurantRepository.removeRestaurantBanner(restaurantId, image);
                return {
                    status: 200,
                    data: removeBanner
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
    //edit restaurant details
    editRestaurant(restaurantId, restaurantDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (restaurantDetails.banners) {
                    const uploadedBanners = yield Promise.all(restaurantDetails.banners.map((file) => __awaiter(this, void 0, void 0, function* () {
                        return yield this.cloudinary.saveToCloudinary(file);
                    })));
                    console.log(uploadedBanners);
                    restaurantDetails.banners = uploadedBanners;
                }
                const editedRestauarantStatus = yield this.restaurantRepository.editRestaurant(restaurantId, restaurantDetails);
                return {
                    status: 200,
                    data: editedRestauarantStatus
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
    //searching restaurant
    searchRestaurants(searcQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchResults = yield this.restaurantRepository.searchRestaurant(searcQuery);
                return {
                    status: 200,
                    data: searchResults
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
    //filter restaurant
    filterRestaurants(cuisines, facilities, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurants = yield this.restaurantRepository.filterRestaurant(cuisines, facilities, page);
                return {
                    status: 200,
                    data: restaurants
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
exports.default = RestaurantUsecase;
