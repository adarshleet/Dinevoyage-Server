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
const couponModal_1 = __importDefault(require("../database/couponModal"));
class CouponRepository {
    addCoupon(coupon) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = new Date();
                const couponDate = new Date(coupon.expiryDate);
                if (couponDate < date) {
                    return {
                        data: false,
                        message: 'Past Date Cannot be applied to expiry date'
                    };
                }
                const couponFound = yield couponModal_1.default.findOne({ couponName: coupon.couponName });
                if (couponFound) {
                    return {
                        data: false,
                        message: 'Already existing coupon name'
                    };
                }
                const couponToAdd = new couponModal_1.default(coupon);
                const couponAdd = yield couponToAdd.save();
                return {
                    data: couponAdd
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editCoupon(coupon) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(coupon);
                const couponEdit = yield couponModal_1.default.findByIdAndUpdate(coupon._id, { $set: coupon });
                return couponEdit;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    couponStatusChange(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCoupon = yield couponModal_1.default.findById(id);
                console.log(existingCoupon, id);
                if (existingCoupon) {
                    const couponEdit = yield couponModal_1.default.findByIdAndUpdate(id, {
                        $set: {
                            isListed: !existingCoupon.isListed
                        }
                    }, { new: true });
                    return couponEdit;
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllCoupon(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = 5;
                const allCoupons = yield couponModal_1.default.find({}).skip((page - 1) * limit).limit(limit);
                const totalCoupons = yield couponModal_1.default.find().countDocuments();
                const totalPages = Math.floor(totalCoupons / limit);
                return {
                    allCoupons,
                    totalPages
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    couponInCheckout(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const couponToShow = yield couponModal_1.default.find({ isListed: true, usedUsers: { $nin: userId } });
                return couponToShow;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = CouponRepository;
