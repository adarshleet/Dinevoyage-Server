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
class CouponController {
    constructor(CouponUsecase) {
        this.CouponUsecase = CouponUsecase;
    }
    addCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupon = req.body;
                const couponAdd = yield this.CouponUsecase.addCoupon(coupon);
                res.status(200).json(couponAdd);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    allCoupons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page);
                const allCoupons = yield this.CouponUsecase.getAllCoupons(page);
                res.status(200).json(allCoupons);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    couponToShow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId;
                const token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                const couponToShow = yield this.CouponUsecase.couponToShow(userId);
                res.status(200).json(couponToShow);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = CouponController;
