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
class adminController {
    constructor(Adminusecase) {
        this.Adminusecase = Adminusecase;
    }
    adminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = req.body;
                const loginStatus = yield this.Adminusecase.adminLogin(admin);
                console.log(loginStatus);
                if (loginStatus.data && typeof loginStatus.data === 'object' && 'token' in loginStatus.data) {
                    res.cookie('adminJWT', loginStatus.data.token, {
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
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = req.query.page ? parseInt(req.query.page) : 1;
                const allUsers = yield this.Adminusecase.getAllUsers(page);
                res.status(200).json(allUsers === null || allUsers === void 0 ? void 0 : allUsers.data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    blockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const userStatus = yield this.Adminusecase.blockUser(id);
                // console.log(userStatus)
                res.status(200).json(userStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllVendors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = req.query.page ? parseInt(req.query.page) : 1;
                const allVendors = yield this.Adminusecase.getAllVendors(page);
                res.status(200).json(allVendors === null || allVendors === void 0 ? void 0 : allVendors.data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    blockVendor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const vendorStatus = yield this.Adminusecase.blockVendor(id);
                res.status(200).json(vendorStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    adminLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie('adminJWT', '', {
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
exports.default = adminController;
