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
class BannerUsecase {
    constructor(BannerRepository, cloudinary) {
        this.BannerRepository = BannerRepository;
        this.cloudinary = cloudinary;
    }
    addBanner(banner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bannerUpload = yield this.cloudinary.saveToCloudinary(banner);
                const bannerAdd = yield this.BannerRepository.addBanner(bannerUpload);
                return {
                    status: 200,
                    data: bannerAdd
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getBanners() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banners = yield this.BannerRepository.getBanners();
                return {
                    status: 200,
                    data: banners
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteBanner(banner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bannerDelete = yield this.BannerRepository.deleteBanner(banner);
                return {
                    status: 200,
                    data: bannerDelete
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = BannerUsecase;
