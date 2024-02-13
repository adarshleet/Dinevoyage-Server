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
class userController {
    constructor(userUsecase) {
        this.userUsecase = userUsecase;
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                console.log(user);
                if (user.isGoogle) {
                    const userFound = yield this.userUsecase.emailExistCheck(user.email);
                    if (!userFound.data) {
                        const userSave = yield this.userUsecase.saveUser(user);
                        res.status(200).json({ data: true, userSave });
                    }
                    else {
                        res.status(200).json({ data: false, message: 'Email Id already in use' });
                    }
                }
                else {
                    const userFound = yield this.userUsecase.mobileExistCheck(user.mobile);
                    if (!userFound.data) {
                        req.app.locals = user;
                        const verify = yield this.userUsecase.verifyMobile(user.mobile);
                        req.app.locals.orderId = verify.data;
                        res.status(200).json(verify);
                    }
                    else {
                        res.status(200).json({ data: false, message: 'Mobile number already in use' });
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
                const user = req.app.locals;
                const otp = req.body.otp;
                const orderId = req.app.locals.orderId;
                const verifyOtp = yield this.userUsecase.verifyOtp(user.mobile, otp, orderId);
                if (verifyOtp.data) {
                    const userSave = yield this.userUsecase.saveUser(user);
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
                const user = req.body;
                const loginStatus = yield this.userUsecase.userLogin(user);
                if (loginStatus.data && typeof loginStatus.data === 'object' && 'token' in loginStatus.data) {
                    res.cookie('userJWT', loginStatus.data.token, {
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
    //find user by id
    findUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId;
                const token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                const userFound = yield this.userUsecase.findUser(userId);
                res.status(200).json(userFound);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const userFound = yield this.userUsecase.findUser(userId);
                res.status(200).json(userFound);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //change user name
    changeName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.name;
                let userId;
                const token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                const nameChangeStatus = yield this.userUsecase.changeName(userId, name);
                res.status(200).json(nameChangeStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //otp sending for mobile change
    verifyNewMobile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mobile = req.body.mobile;
                const userFound = yield this.userUsecase.mobileExistCheck(mobile);
                if (!userFound.data) {
                    req.app.locals = mobile;
                    const verify = yield this.userUsecase.verifyMobile(mobile);
                    res.status(200).json(verify);
                }
                else {
                    res.status(200).json({ data: false, message: 'Mobile number already in use' });
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
                const { otp, mobile } = req.body;
                let userId;
                const token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                const orderId = req.app.locals.orderId;
                const verifyOtp = yield this.userUsecase.verifyOtp(mobile, otp, orderId);
                if (verifyOtp.data) {
                    console.log(mobile);
                    const userSave = yield this.userUsecase.changeMobile(userId, mobile);
                }
                res.status(200).json(verifyOtp);
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
                const { currentPassword, newPassword } = req.body;
                let userId;
                const token = req.cookies.userJWT;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    userId = decoded.id;
                }
                const passwordChangeStatus = yield this.userUsecase.changePassword(userId, newPassword, currentPassword);
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
                const userFound = yield this.userUsecase.mobileExistCheck(mobile);
                console.log(mobile);
                if (userFound.data) {
                    req.app.locals = mobile;
                    const verify = yield this.userUsecase.verifyMobile(mobile);
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
    //verifyMobile for forgot password
    verifyMobile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = req.body.otp;
                const mobile = req.app.locals;
                const orderId = req.app.locals.orderId;
                const mobileVerify = yield this.userUsecase.verifyOtp(mobile, otp, orderId);
                res.status(200).json(mobileVerify);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //forgot password change
    forgotPasswordChange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = req.body.password;
                const mobile = req.app.locals;
                const passwordChange = yield this.userUsecase.forgotPasswordChange(mobile, password);
                res.status(200).json(passwordChange);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    userLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie('userJWT', '', {
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
    restaurantsToDisplay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page);
                const restaurants = yield this.userUsecase.restaurantsToDisplay(page);
                res.status(200).json(restaurants);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    restaurantsForMap(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurants = yield this.userUsecase.restaurantsForMap();
                console.log(restaurants);
                res.status(200).json(restaurants);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    singleRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                const restaurant = yield this.userUsecase.singleRestaurant(restaurantId);
                res.status(200).json(restaurant);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = userController;
