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
const userModel_1 = __importDefault(require("../database/userModel"));
const restaurantModel_1 = __importDefault(require("../database/restaurantModel"));
const KitchenModel_1 = __importDefault(require("../database/KitchenModel"));
class userRepository {
    //saving user to databse
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new userModel_1.default(user);
            yield newUser.save();
            return newUser;
        });
    }
    //checking given mobile exist on database
    mobileExistCheck(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield userModel_1.default.findOne({ mobile });
            return userFound;
        });
    }
    emailExistCheck(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield userModel_1.default.findOne({ email });
            return userFound;
        });
    }
    findUserById(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield userModel_1.default.findById(user);
            return userFound;
        });
    }
    //user name change
    usernameChange(userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nameChangeStatus = yield userModel_1.default.findByIdAndUpdate(userId, { $set: { name } });
                return nameChangeStatus;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //user mobile change
    mobileChange(userId, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("red", mobile, userId);
                const mobileChangeStatus = yield userModel_1.default.findByIdAndUpdate(userId, { $set: { mobile } }, { new: true });
                return mobileChangeStatus;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //change password
    changePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordChangeStatus = yield userModel_1.default.findByIdAndUpdate(userId, { $set: { password } }, { new: true });
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
                const passwordChange = yield userModel_1.default.updateOne({ mobile }, { $set: { password } });
                return passwordChange;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //restaurant to showing 
    restaurantsToShow(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurantIds = yield KitchenModel_1.default.find({
                items: { $exists: true, $not: { $size: 0 } }
            }, { restaurantId: 1, _id: 0 });
            const restaurantIdStrings = restaurantIds.map((res) => { var _a; return (_a = res.restaurantId) === null || _a === void 0 ? void 0 : _a.toString(); });
            const limit = 6;
            const restaurants = yield restaurantModel_1.default.find({ _id: { $in: restaurantIdStrings } }).skip((page - 1) * limit).limit(limit);
            const totalCount = yield restaurantModel_1.default.find({ _id: { $in: restaurantIdStrings } }).countDocuments();
            const totalPages = Math.floor(totalCount / limit);
            return {
                restaurants,
                totalPages
            };
        });
    }
    //restaurants for map
    restaurantsToShowInMap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantIds = yield KitchenModel_1.default.find({
                    items: { $exists: true, $not: { $size: 0 } }
                }, { restaurantId: 1, _id: 0 });
                const restaurantIdStrings = restaurantIds.map((res) => { var _a; return (_a = res.restaurantId) === null || _a === void 0 ? void 0 : _a.toString(); });
                const restaurants = yield restaurantModel_1.default.find({ _id: { $in: restaurantIdStrings } });
                return restaurants;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //single restaurant page
    singleRestaurant(restauarantId) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = yield restaurantModel_1.default.findOne({ _id: restauarantId });
            return restaurant;
        });
    }
}
exports.default = userRepository;
