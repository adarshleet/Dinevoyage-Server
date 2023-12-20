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
class vendorController {
    constructor(vendorUsecase) {
        this.vendorUsecase = vendorUsecase;
    }
    vendorRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendor = req.body;
                // console.log(vendor)
                if (vendor.isGoogle) {
                    const vendorFound = yield this.vendorUsecase.emailExistCheck(vendor.email);
                    if (!vendorFound.data) {
                        const vendorSave = yield this.vendorUsecase.saveVendor(vendor);
                        res.status(200).json({ data: true, vendorSave });
                    }
                    else {
                        res.status(200).json({ data: false, message: 'Email Id already in use' });
                    }
                }
                else {
                    const vendorFound = yield this.vendorUsecase.mobileExistCheck(vendor.mobile);
                    console.log(vendorFound);
                    if (!vendorFound.data) {
                        req.app.locals = vendor;
                        const verify = yield this.vendorUsecase.verifyMobile(vendor.mobile);
                        res.status(200).json(verify);
                    }
                    else {
                        res.status(200).json({ data: false, message: 'Mobile number already registered' });
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    otpVerification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendor = req.app.locals;
                const otp = req.body.otp;
                // console.log(otp, vendor)
                const verifyOtp = yield this.vendorUsecase.verifyOtp(vendor.mobile, otp);
                // console.log(verifyOtp)
                if (verifyOtp.data) {
                    const vendorSave = yield this.vendorUsecase.saveVendor(vendor);
                }
                res.status(200).json(verifyOtp);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendor = req.body;
                const loginStatus = yield this.vendorUsecase.vendorLogin(vendor);
                console.log(loginStatus);
                if (loginStatus.data && typeof loginStatus.data === 'object' && 'token' in loginStatus.data) {
                    console.log('hererere');
                    res.cookie('vendorJWT', loginStatus.data.token, {
                        httpOnly: true,
                        sameSite: 'none',
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                    });
                }
                res.status(loginStatus.status).json(loginStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //get vendor details
    getVendorDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies.vendorJWT;
                let vendorId;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    vendorId = decoded.id;
                }
                const vendorDetails = yield this.vendorUsecase.getVendorDetails(vendorId);
                res.status(200).json(vendorDetails);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //change vendor name
    changeVendorName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies.vendorJWT;
                let vendorId;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    vendorId = decoded.id;
                }
                const name = req.body.name;
                const vendorNameChange = yield this.vendorUsecase.changeVendorName(vendorId, name);
                res.status(200).json(vendorNameChange);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //verify new mobile
    verifyNewMobile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mobile = req.body.mobile;
                const vendorFound = yield this.vendorUsecase.mobileExistCheck(mobile);
                if (vendorFound.data) {
                    res.status(200).json({ data: false });
                }
                else {
                    const verifyMobileStatus = yield this.vendorUsecase.verifyMobile(mobile);
                    res.status(200).json(verifyMobileStatus);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //change mobile
    changeMobile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mobile, otp } = req.body;
                const token = req.cookies.vendorJWT;
                let vendorId;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    vendorId = decoded.id;
                }
                const changeMobileStatus = yield this.vendorUsecase.changeMobile(vendorId, mobile, otp);
                res.status(200).json(changeMobileStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //change password
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newPassword, currentPassword } = req.body;
                const token = req.cookies.vendorJWT;
                let vendorId;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    vendorId = decoded.id;
                }
                const passwordChangeStatus = yield this.vendorUsecase.changePassword(vendorId, newPassword, currentPassword);
                res.status(200).json(passwordChangeStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mobile = req.query.mobile;
                const userFound = yield this.vendorUsecase.mobileExistCheck(mobile);
                console.log(mobile);
                if (userFound.data) {
                    req.app.locals = mobile;
                    const verify = yield this.vendorUsecase.verifyMobile(mobile);
                    res.status(200).json(verify);
                }
                else {
                    res.status(200).json({ data: false, message: 'Mobile number not registered' });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    forgotPasswordChange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = req.body.password;
                const mobile = req.app.locals;
                const passwordChange = yield this.vendorUsecase.forgotPasswordChange(mobile, password);
                res.status(200).json(passwordChange);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    vendorLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie('vendorJWT', '', {
                    httpOnly: true,
                    expires: new Date(0)
                });
                res.status(200).json({ success: true });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = vendorController;
