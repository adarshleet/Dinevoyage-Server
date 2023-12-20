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
class cusineController {
    constructor(cuisineUsecase) {
        this.cuisineUsecase = cuisineUsecase;
    }
    addFacility(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const facility = req.body.facility;
                const facilityStatus = yield this.cuisineUsecase.addFacility(facility);
                console.log(facilityStatus);
                res.status(200).json(facilityStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    allFacilities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const facilities = yield this.cuisineUsecase.allFacilities();
                res.status(200).json(facilities === null || facilities === void 0 ? void 0 : facilities.data[0].facilities);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editFacility(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const index = parseInt(req.query.index);
                const facility = req.query.facility;
                const facilityEdit = yield this.cuisineUsecase.editFacility(facility, index);
                res.status(200).json(facilityEdit);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteFacility(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const facility = req.query.facility;
                const facilityDelete = yield this.cuisineUsecase.deleteFacility(facility);
                res.status(200).json(facilityDelete);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addCuisine(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cuisine = req.body.cuisine;
                const cuisineStatus = yield this.cuisineUsecase.addCuisine(cuisine);
                res.status(200).json(cuisineStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    allCuisines(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cuisines = yield this.cuisineUsecase.allCuisines();
                res.status(200).json(cuisines === null || cuisines === void 0 ? void 0 : cuisines.data[0].cuisines);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editCuisine(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const index = parseInt(req.query.index);
                const cuisine = req.query.cuisine;
                const cuisineEdit = yield this.cuisineUsecase.editCuisine(cuisine, index);
                res.status(200).json(cuisineEdit);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteCuisine(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cuisine = req.query.cuisine;
                const cuisineDelete = yield this.cuisineUsecase.deleteCuisine(cuisine);
                console.log(cuisineDelete);
                res.status(200).json(cuisineDelete);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = cusineController;
