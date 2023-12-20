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
class CouponUsecase {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }
    addCoupon(coupon) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const couponAdd = yield this.couponRepository.addCoupon(coupon);
                return {
                    status: 200,
                    data: couponAdd
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
    getAllCoupons(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCoupons = yield this.couponRepository.getAllCoupon(page);
                return {
                    status: 200,
                    data: allCoupons
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
    couponToShow(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const couponToShow = yield this.couponRepository.couponInCheckout(userId);
                return {
                    status: 200,
                    data: couponToShow
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
exports.default = CouponUsecase;
