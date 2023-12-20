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
class Userusecase {
    constructor(userRepository, twilioService, Encrypt, jwtCreate) {
        this.userRepository = userRepository;
        this.twilioService = twilioService;
        this.Encrypt = Encrypt;
        this.jwtCreate = jwtCreate;
    }
    //saving user to database
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield this.Encrypt.createHash(user.password);
                user.password = hashedPassword;
                const userSave = yield this.userRepository.save(user);
                return {
                    status: 200,
                    data: userSave
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
    //sending otp to given mobile number
    verifyMobile(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verify = yield this.twilioService.sendTwilioOtp(mobile);
                return {
                    status: 200,
                    data: verify,
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
    //verifying mobile and otp
    verifyOtp(mobile, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyOtp = yield this.twilioService.verifyOtp(mobile, otp);
                return {
                    status: 200,
                    data: verifyOtp
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
    //change mobile
    changeMobile(userId, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(mobile);
                const mobileChangeStatus = yield this.userRepository.mobileChange(userId, mobile);
                return {
                    status: 200,
                    data: mobileChangeStatus
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
    //checking mobile number exist on database
    mobileExistCheck(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.mobileExistCheck(mobile);
                return {
                    status: 200,
                    data: userFound
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
    //email exist check
    emailExistCheck(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.emailExistCheck(email);
                return {
                    status: 200,
                    data: userFound
                };
            }
            catch (error) {
                return {
                    status: 200,
                    data: error
                };
            }
        });
    }
    //checking user mobile exist and compare password
    userLogin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userFound;
                if (user.isGoogle) {
                    userFound = yield this.userRepository.emailExistCheck(user.email);
                }
                else {
                    userFound = yield this.userRepository.mobileExistCheck(user.mobile);
                }
                console.log(userFound);
                if (userFound) {
                    if (userFound.isBlocked) {
                        return {
                            status: 200,
                            data: {
                                success: false,
                                message: 'You have been blocked',
                            }
                        };
                    }
                    const passwordMatch = yield this.Encrypt.compare(user.password, userFound.password);
                    if (passwordMatch) {
                        const token = this.jwtCreate.createJwt(userFound._id);
                        return {
                            status: 200,
                            data: {
                                success: true,
                                message: 'authentication succesfull',
                                userId: userFound._id,
                                token: token
                            }
                        };
                    }
                    else {
                        return {
                            status: 200,
                            data: {
                                success: false,
                                message: 'invalid mobile or password',
                            }
                        };
                    }
                }
                else {
                    return {
                        status: 200,
                        data: {
                            success: false,
                            message: 'invalid mobile or password',
                        }
                    };
                }
            }
            catch (error) {
                return {
                    status: 400,
                    data: error
                };
            }
        });
    }
    //find user by id
    findUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findUserById(user);
                return {
                    status: 200,
                    data: userFound
                };
            }
            catch (error) {
                return {
                    status: 400,
                    return: error
                };
            }
        });
    }
    //user name change
    changeName(userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nameChangeStatus = yield this.userRepository.usernameChange(userId, name);
                return {
                    status: 200,
                    data: nameChangeStatus
                };
            }
            catch (error) {
                return {
                    status: 200,
                    data: error
                };
            }
        });
    }
    //password change
    changePassword(userId, password, currentPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findUserById(userId);
                if (userFound) {
                    const passwordMatch = yield this.Encrypt.compare(currentPassword, userFound.password);
                    if (passwordMatch) {
                        const hashedPassword = yield this.Encrypt.createHash(password);
                        const passwordChangeStatus = yield this.userRepository.changePassword(userId, hashedPassword);
                        return {
                            status: 200,
                            data: passwordChangeStatus
                        };
                    }
                    else {
                        return {
                            status: 200,
                            data: passwordMatch
                        };
                    }
                }
            }
            catch (error) {
                return {
                    status: 400,
                    data: error
                };
            }
        });
    }
    // change password forgot
    forgotPasswordChange(mobile, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield this.Encrypt.createHash(password);
                const passwordChange = yield this.userRepository.forgotPasswordChange(mobile, hashedPassword);
                return {
                    status: 200,
                    data: passwordChange
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
    //restaurants showing
    restaurantsToDisplay(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurants = yield this.userRepository.restaurantsToShow(page);
                return {
                    status: 200,
                    data: restaurants
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //restaurants for displaying in map
    restaurantsForMap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurants = yield this.userRepository.restaurantsToShowInMap();
                return {
                    status: 200,
                    data: restaurants
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
    //single restaurant page
    singleRestaurant(restauarantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurant = yield this.userRepository.singleRestaurant(restauarantId);
                return {
                    status: 200,
                    data: restaurant
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Userusecase;
