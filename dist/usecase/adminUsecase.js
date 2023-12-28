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
class Adminusecase {
    constructor(AdminRepository, Encrypt, JwtCreate) {
        this.AdminRepository = AdminRepository;
        this.Encrypt = Encrypt;
        this.JwtCreate = JwtCreate;
    }
    adminLogin(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminFound = yield this.AdminRepository.adminLoginCheck(admin.email);
                console.log(adminFound);
                if (adminFound) {
                    const passwordMatch = yield this.Encrypt.compare(admin.password, adminFound.password);
                    const token = this.JwtCreate.createJwt(adminFound._id, 'admin');
                    if (passwordMatch) {
                        return {
                            status: 200,
                            data: {
                                success: true,
                                message: "Authentication successful",
                                adminId: adminFound._id,
                                token: token
                            }
                        };
                    }
                    else {
                        return {
                            status: 200,
                            data: {
                                success: false,
                                message: 'Invalid email or password',
                            }
                        };
                    }
                }
                else {
                    return {
                        status: 200,
                        data: {
                            success: false,
                            message: 'Invalid email or password',
                        }
                    };
                }
            }
            catch (error) {
                console.log(error);
                throw new Error('Internal server error');
            }
        });
    }
    getAllUsers(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield this.AdminRepository.allUsers(page);
                // console.log(allUsers)
                return {
                    status: 200,
                    data: allUsers
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    blockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userStatus = yield this.AdminRepository.blockUser(id);
                return {
                    status: 200,
                    data: userStatus
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllVendors(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allVendors = yield this.AdminRepository.allVendors(page);
                return {
                    status: 200,
                    data: allVendors
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    blockVendor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vendorStatus = yield this.AdminRepository.blockVendor(id);
                return {
                    status: 200,
                    data: vendorStatus
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Adminusecase;
