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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const vendorRepository_1 = __importDefault(require("../repository/vendorRepository"));
const vendorRepo = new vendorRepository_1.default();
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    token = req.cookies.vendorJWT;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            const vendor = yield vendorRepo.findVendorById(decoded.id);
            if (vendor) {
                // req.userId = user._id;
                if (vendor.isBlocked) {
                    return res.status(401).json({ message: 'Vendor have been blocked by admin' });
                }
                else {
                    next();
                }
            }
            else {
                return res.status(401).json({ message: 'Not authorized, invalid token' });
            }
        }
        catch (error) {
            return res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    }
    else {
        return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
});
exports.protect = protect;
