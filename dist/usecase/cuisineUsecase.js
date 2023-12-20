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
class CuisineUseCase {
    constructor(cuisineRepository) {
        this.cuisineRepository = cuisineRepository;
    }
    addFacility(facility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const facilityStatus = yield this.cuisineRepository.addFacility(facility);
                console.log(facilityStatus);
                return {
                    status: 200,
                    data: facilityStatus
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    allFacilities() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const facilities = yield this.cuisineRepository.allFacilities();
                return {
                    status: 200,
                    data: facilities
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editFacility(facility, index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const facilityEdit = yield this.cuisineRepository.editFacility(facility, index);
                return {
                    status: 200,
                    data: facilityEdit
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteFacility(facility) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const facilityDelete = yield this.cuisineRepository.deleteFacilty(facility);
                return {
                    status: 200,
                    data: facilityDelete
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addCuisine(cuisine) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cuisineStatus = yield this.cuisineRepository.addCuisine(cuisine);
                return {
                    status: 200,
                    data: cuisineStatus
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    allCuisines() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCuisines = yield this.cuisineRepository.allCuisines();
                return {
                    status: 200,
                    data: allCuisines
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editCuisine(cuisine, index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cuisineEdit = yield this.cuisineRepository.editCuisine(cuisine, index);
                return {
                    status: 200,
                    data: cuisineEdit
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteCuisine(cuisine) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cuisineDelete = yield this.cuisineRepository.deleteCuisine(cuisine);
                return {
                    status: 200,
                    data: cuisineDelete
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = CuisineUseCase;
