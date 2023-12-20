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
const reviewModel_1 = __importDefault(require("../database/reviewModel"));
const mongoose_1 = require("mongoose");
const bookingsModel_1 = __importDefault(require("../database/bookingsModel"));
class reviewRepository {
    addReview(restaurantId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewAdd = yield reviewModel_1.default.updateOne({ restaurantId }, { $push: { reviews: review } }, { upsert: true });
                return reviewAdd;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getReviews(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield reviewModel_1.default.findOne({ restaurantId }).populate('reviews.userId');
                return reviews;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAverage(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const averageRating = yield reviewModel_1.default.aggregate([
                    {
                        $match: {
                            restaurantId: new mongoose_1.Types.ObjectId(restaurantId)
                        }
                    },
                    {
                        $unwind: "$reviews"
                    },
                    {
                        $group: {
                            _id: null,
                            totalCount: { $sum: 1 },
                            totalScore: { $sum: "$reviews.rating" }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            totalCount: "$totalCount",
                            averageRating: { $divide: ["$totalScore", "$totalCount"] }
                        }
                    }
                ]);
                return averageRating[0];
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //checking user is on booking of the restaurant
    userInBooking(restaurantId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield bookingsModel_1.default.findOne({
                    'restaurantId': restaurantId,
                    'bookings': {
                        $elemMatch: {
                            'user': userId,
                            'orderStatus': 3,
                        },
                    },
                });
                return userFound;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findReview(restaurantId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewFound = yield reviewModel_1.default.findOne({ restaurantId, 'reviews.userId': userId });
                return reviewFound;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editReview(restaurantId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewEdit = yield reviewModel_1.default.updateOne({ restaurantId, 'reviews.userId': review.userId }, { $set: { 'reviews.$.rating': review.rating, 'reviews.$.review': review.review } });
                return reviewEdit;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = reviewRepository;
