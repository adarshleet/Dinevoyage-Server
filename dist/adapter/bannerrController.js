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
class BannerController {
    constructor(bannerUsecase) {
        this.bannerUsecase = bannerUsecase;
    }
    addBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banner = req.file;
                const bannerAdd = yield this.bannerUsecase.addBanner(banner);
                res.status(200).json(bannerAdd);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getBanners(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banners = yield this.bannerUsecase.getBanners();
                res.status(200).json(banners);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banner = req.query.banner;
                const bannerDelete = yield this.bannerUsecase.deleteBanner(banner);
                res.status(200).json(bannerDelete);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = BannerController;
