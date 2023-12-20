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
const vendorModel_1 = __importDefault(require("../database/vendorModel"));
class vendoRepository {
    mobileExistCheck(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendorFound = yield vendorModel_1.default.findOne({ mobile });
            return vendorFound;
        });
    }
    saveVendor(vendor) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(vendor);
            const newVendor = new vendorModel_1.default(vendor);
            yield newVendor.save();
            return newVendor;
        });
    }
    emailExistCheck(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendorFound = yield vendorModel_1.default.findOne({ email });
            return vendorFound;
        });
    }
    findVendorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendorFound = yield vendorModel_1.default.findById(id);
            return vendorFound;
        });
    }
    changeVendorName(vendorId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorNameChange = yield vendorModel_1.default.findByIdAndUpdate(vendorId, { $set: { name } });
                return vendorNameChange;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    changeMobile(vendorId, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorMobileChange = yield vendorModel_1.default.findByIdAndUpdate(vendorId, { $set: { mobile } });
                return vendorMobileChange;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    changePassword(vendorId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordChangeStatus = yield vendorModel_1.default.findByIdAndUpdate(vendorId, { $set: { password } });
                return passwordChangeStatus;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    forgotPasswordChange(mobile, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordChange = yield vendorModel_1.default.updateOne({ mobile }, { $set: { password } });
                return passwordChange;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = vendoRepository;
