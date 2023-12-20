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
const adminModel_1 = __importDefault(require("../database/adminModel"));
const userModel_1 = __importDefault(require("../database/userModel"));
const vendorModel_1 = __importDefault(require("../database/vendorModel"));
class adminRepository {
    //ADMIN LOGIN
    adminLoginCheck(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminFound = yield adminModel_1.default.findOne({ email: email });
                if (adminFound)
                    return adminFound;
                return null;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    allUsers(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let limit = 5;
                const allUsers = yield userModel_1.default.find().skip((page - 1) * limit).limit(limit);
                const totalData = yield userModel_1.default.countDocuments();
                const usersDetails = {
                    allUsers,
                    totalData,
                    totalPages: Math.ceil(totalData / limit),
                    limit
                };
                return usersDetails;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    blockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findById(id);
                if (user) {
                    const newStatus = !user.isBlocked;
                    const userStatus = yield userModel_1.default.updateOne({ _id: id }, { $set: { isBlocked: newStatus } });
                    return userStatus;
                }
                else
                    return null;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    allVendors(page) {
        return __awaiter(this, void 0, void 0, function* () {
            let limit = 5;
            const allVendors = yield vendorModel_1.default.find().skip((page - 1) * limit).limit(limit);
            const totalData = yield vendorModel_1.default.countDocuments();
            const vendorDetails = {
                allVendors,
                totalData,
                totalPages: Math.ceil(totalData / limit),
            };
            return vendorDetails;
        });
    }
    blockVendor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendor = yield vendorModel_1.default.findById(id);
            if (vendor) {
                const newStatus = !vendor.isBlocked;
                const vendorStatus = yield vendorModel_1.default.updateOne({ _id: id }, { $set: { isBlocked: newStatus } });
                return vendorStatus;
            }
            else
                return null;
        });
    }
}
exports.default = adminRepository;
