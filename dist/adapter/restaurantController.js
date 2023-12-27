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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class restaurantController {
    constructor(restaurantUsecase) {
        this.restaurantUsecase = restaurantUsecase;
    }
    addRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies.vendorJWT;
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                let vendorId = decoded.id;
                const { restaurantName, landmark, locality, location, district, openingTime, closingTime, minCost, googlemapLocation, contactNumber, tableCounts } = req.body;
                const banners = req.files;
                const restaurantData = {
                    vendorId: vendorId,
                    restaurantName,
                    landmark,
                    locality,
                    location,
                    district,
                    openingTime,
                    closingTime,
                    minCost,
                    googlemapLocation,
                    contactNumber,
                    tableCounts,
                    banners
                };
                const restaurantAdd = yield this.restaurantUsecase.addRestaurant(restaurantData);
                res.status(200).json(restaurantAdd);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    restaurantForVendor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies.vendorJWT;
                let vendorId;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    vendorId = decoded.id;
                }
                const restaurant = yield this.restaurantUsecase.vendorRestaurant(vendorId);
                res.status(200).json(restaurant);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    restaurantRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantRequests = yield this.restaurantUsecase.restaurantRequests();
                res.status(200).json(restaurantRequests);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //single restaurant request
    singleRestaurantRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.params.id;
                const restaurantData = yield this.restaurantUsecase.singleRestaurantRequest(restaurantId);
                res.status(200).json(restaurantData);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //change restaurant status
    changeRestaurantStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                let status = parseInt(req.query.status);
                const restaurantStatus = yield this.restaurantUsecase.changeRestaurantStatus(id, status);
                res.status(200).json(restaurantStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //select restaurant cuisines by vendor
    selectCuisines(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cuisines = req.body.cuisines;
                const id = req.query.restaurantId;
                const cuisinesSelected = yield this.restaurantUsecase.selectCuisines(id, cuisines);
                res.status(200).json(cuisinesSelected);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //select restaurant facilities by vendor
    selectFacilities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const facilities = req.body.facilities;
                const id = req.query.restaurantId;
                const facilitiesSelected = yield this.restaurantUsecase.selectFacilities(id, facilities);
                res.status(200).json(facilitiesSelected);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //selected cuisines and facilities by restaurant
    selectedCuisinesAndFacilities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id;
                const token = req.cookies.vendorJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    id = decoded.id;
                }
                const selectedCuisinesAndFacilities = yield this.restaurantUsecase.selectedCuisinesAndFacilities(id);
                res.status(200).json(selectedCuisinesAndFacilities);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getRestaurantDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                const restauarantDetails = yield this.restaurantUsecase.getRestaurantDetails(restaurantId);
                res.status(200).json(restauarantDetails);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //remove banner
    removeRestaurantBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                const image = req.query.image;
                const removeBanner = yield this.restaurantUsecase.removeRestaurantBanner(restaurantId, image);
                res.status(200).json(removeBanner);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //edit restaurant details
    editRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                let restauarantDetails = req.body;
                const banners = req.files;
                restauarantDetails.banners = banners;
                const editedRestauarantStatus = yield this.restaurantUsecase.editRestaurant(restaurantId, restauarantDetails);
                res.status(200).json(editedRestauarantStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //user
    //search restaurants
    searchRestaurants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchQuery = req.query.search;
                const searchResults = yield this.restaurantUsecase.searchRestaurants(searchQuery);
                res.status(200).json(searchResults);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //filter restaurants
    filterRestaurants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cuisines, facilities } = req.body;
                const page = parseInt(req.query.page);
                const restauarants = yield this.restaurantUsecase.filterRestaurants(cuisines, facilities, page);
                res.status(200).json(restauarants);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //newest popular restaurants
    popularRestaurants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const popularRestaurants = yield this.restaurantUsecase.popularRestaurants();
                res.status(200).json(popularRestaurants);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = restaurantController;
