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
class locationController {
    constructor(locationUsecase) {
        this.locationUsecase = locationUsecase;
    }
    addLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { district, locality } = req.body;
                const locationAdd = yield this.locationUsecase.addLocation(district, locality);
                res.status(200).json(locationAdd);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    allLocality(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allLocality = yield this.locationUsecase.allLocality();
                res.status(200).json(allLocality);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = locationController;
