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
class ReviewUsecase {
    constructor(ReviewRepository) {
        this.ReviewRepository = ReviewRepository;
    }
    addReview(restaurantId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewAdd = yield this.ReviewRepository.addReview(restaurantId, review);
                return {
                    status: 200,
                    data: reviewAdd
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
    getReviews(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield this.ReviewRepository.getReviews(restaurantId);
                return {
                    status: 200,
                    data: reviews
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
    getAverage(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const averageRating = yield this.ReviewRepository.getAverage(restaurantId);
                return {
                    status: 200,
                    data: averageRating
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
    userInBooking(restaurantId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.ReviewRepository.userInBooking(restaurantId, userId);
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
    findReview(restauarantId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewFound = yield this.ReviewRepository.findReview(restauarantId, userId);
                return {
                    status: 200,
                    data: reviewFound
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
    editReview(restaurantId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewEdit = yield this.ReviewRepository.editReview(restaurantId, review);
                return {
                    status: 200,
                    data: reviewEdit
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
exports.default = ReviewUsecase;
