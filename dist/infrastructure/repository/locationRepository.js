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
const locationModel_1 = __importDefault(require("../database/locationModel"));
class locationRepository {
    addLocality(district, locality) {
        return __awaiter(this, void 0, void 0, function* () {
            const localityFound = yield locationModel_1.default.findOne({ district, 'locations.locality': locality });
            if (localityFound) {
                return false;
            }
            else {
                const localityAdd = yield locationModel_1.default.updateOne({ district }, { $addToSet: { locations: { locality } } }, { upsert: true });
                return localityAdd;
            }
        });
    }
    allLocality() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allLocality = yield locationModel_1.default.find({});
                return allLocality;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = locationRepository;
