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
const cusinesAndFacilitiesModel_1 = __importDefault(require("../database/cusinesAndFacilitiesModel"));
class cuisineRepository {
    addFacility(facility) {
        return __awaiter(this, void 0, void 0, function* () {
            const newFacility = yield cusinesAndFacilitiesModel_1.default.updateOne({}, { $addToSet: { facilities: facility } }, { upsert: true });
            console.log(newFacility);
            return newFacility;
        });
    }
    allFacilities() {
        return __awaiter(this, void 0, void 0, function* () {
            const facilities = yield cusinesAndFacilitiesModel_1.default.find({}, { facilities: 1 });
            return facilities;
        });
    }
    editFacility(facility, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const facilityExists = yield cusinesAndFacilitiesModel_1.default.findOne({ facilities: { $in: [facility] } });
            if (facilityExists) {
                return false;
            }
            const facilityEdit = yield cusinesAndFacilitiesModel_1.default.updateMany({}, { $set: { [`facilities.${index}`]: facility } });
            return facilityEdit;
        });
    }
    deleteFacilty(facility) {
        return __awaiter(this, void 0, void 0, function* () {
            const facilityDelete = yield cusinesAndFacilitiesModel_1.default.updateOne({}, { $pull: { facilities: facility } });
            return facilityDelete;
        });
    }
    addCuisine(cuisine) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCuisine = yield cusinesAndFacilitiesModel_1.default.updateOne({}, { $addToSet: { cuisines: cuisine } }, { upsert: true });
            return newCuisine;
        });
    }
    allCuisines() {
        return __awaiter(this, void 0, void 0, function* () {
            const cuisines = yield cusinesAndFacilitiesModel_1.default.find({}, { cuisines: 1 });
            return cuisines;
        });
    }
    editCuisine(cuisine, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuisineExists = yield cusinesAndFacilitiesModel_1.default.findOne({ cuisines: { $in: [cuisine] } });
            if (cuisineExists) {
                return false;
            }
            const cuisineEdit = yield cusinesAndFacilitiesModel_1.default.updateMany({}, { $set: { [`cuisines.${index}`]: cuisine } });
            return cuisineEdit;
        });
    }
    deleteCuisine(cuisine) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuisineDelete = yield cusinesAndFacilitiesModel_1.default.updateOne({}, { $pull: { cuisines: cuisine } });
            return cuisineDelete;
        });
    }
}
exports.default = cuisineRepository;
