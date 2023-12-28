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
class Vendorusecase {
    constructor(vendorRepository, twilioService, encrypt, jwtCreate) {
        this.vendorRepository = vendorRepository;
        this.twilioService = twilioService;
        this.encrypt = encrypt;
        this.jwtCreate = jwtCreate;
    }
    mobileExistCheck(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorFound = yield this.vendorRepository.mobileExistCheck(mobile);
                return {
                    status: 200,
                    data: vendorFound
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
    emailExistCheck(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorFound = yield this.vendorRepository.emailExistCheck(email);
                return {
                    status: 200,
                    data: vendorFound
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
    saveVendor(vendor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield this.encrypt.createHash(vendor.password);
                vendor.password = hashedPassword;
                const vendorSave = yield this.vendorRepository.saveVendor(vendor);
                console.log(vendorSave);
                return {
                    status: 200,
                    data: vendorSave
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
    vendorLogin(vendor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vendorFound;
                if (vendor.isGoogle) {
                    vendorFound = yield this.vendorRepository.emailExistCheck(vendor.email);
                }
                else {
                    vendorFound = yield this.vendorRepository.mobileExistCheck(vendor.mobile);
                }
                if (vendorFound) {
                    if (vendorFound.isBlocked) {
                        return {
                            status: 200,
                            data: {
                                success: false,
                                message: 'You have been blocked',
                            }
                        };
                    }
                    const passwordMatch = yield this.encrypt.compare(vendor.password, vendorFound.password);
                    if (passwordMatch) {
                        const token = this.jwtCreate.createJwt(vendorFound._id, 'vendor');
                        return {
                            status: 200,
                            data: {
                                success: true,
                                message: 'authentication succesfull',
                                vendorId: vendorFound._id,
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
    getVendorDetails(vendorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorDetails = yield this.vendorRepository.findVendorById(vendorId);
                return {
                    status: 200,
                    data: vendorDetails
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
    changeVendorName(vendorId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorNameChange = yield this.vendorRepository.changeVendorName(vendorId, name);
                return {
                    status: 200,
                    data: vendorNameChange
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
    //verify otp and change mobile
    changeMobile(vendorId, mobile, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyOtp = yield this.twilioService.verifyOtp(mobile, otp);
                if (verifyOtp) {
                    const changeMobileStatus = yield this.vendorRepository.changeMobile(vendorId, mobile);
                    return {
                        status: 200,
                        data: changeMobileStatus
                    };
                }
                else {
                    return {
                        status: 200,
                        data: verifyOtp
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
    changePassword(vendorId, password, currentPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorFound = yield this.vendorRepository.findVendorById(vendorId);
                if (vendorFound) {
                    const passwordMatch = yield this.encrypt.compare(currentPassword, vendorFound.password);
                    if (passwordMatch) {
                        const hashedPassword = yield this.encrypt.createHash(password);
                        const passwordChangeStatus = yield this.vendorRepository.changePassword(vendorId, hashedPassword);
                        return {
                            status: 200,
                            data: passwordChangeStatus
                        };
                    }
                    else {
                        return {
                            status: 200,
                            data: false
                        };
                    }
                }
                else {
                    return {
                        status: 200,
                        data: false
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
    forgotPasswordChange(mobile, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield this.encrypt.createHash(password);
                const passwordChange = yield this.vendorRepository.forgotPasswordChange(mobile, hashedPassword);
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
}
exports.default = Vendorusecase;
