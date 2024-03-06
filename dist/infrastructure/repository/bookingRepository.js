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
const bookingsModel_1 = __importDefault(require("../database/bookingsModel"));
const userModel_1 = __importDefault(require("../database/userModel"));
const mongoose_1 = require("mongoose");
const restaurantModel_1 = __importDefault(require("../database/restaurantModel"));
const vendorModel_1 = __importDefault(require("../database/vendorModel"));
const couponModal_1 = __importDefault(require("../database/couponModal"));
const node_schedule_1 = __importDefault(require("node-schedule"));
class bookingRepository {
    dateSeatDetails(restaurantId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seatDetails = yield bookingsModel_1.default.findOne({ restaurantId, bookings: { $elemMatch: { date, time } } });
                return seatDetails;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    confirmBooking(bookingDetails) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = bookingDetails.restaurantId;
                if ((_a = bookingDetails === null || bookingDetails === void 0 ? void 0 : bookingDetails.appliedCoupon) === null || _a === void 0 ? void 0 : _a.couponName) {
                    const addUserToCoupon = yield couponModal_1.default.updateOne({ couponName: bookingDetails === null || bookingDetails === void 0 ? void 0 : bookingDetails.appliedCoupon.couponName }, { $push: { usedUsers: bookingDetails.user } });
                }
                if ((_b = bookingDetails === null || bookingDetails === void 0 ? void 0 : bookingDetails.walletAmountUsed) !== null && _b !== void 0 ? _b : 0 > 0) {
                    const walletUpdate = yield userModel_1.default.updateOne({ _id: bookingDetails.user }, { $inc: { wallet: -((_c = bookingDetails.walletAmountUsed) !== null && _c !== void 0 ? _c : 0) }, $push: { walletHistory: {
                                transactionType: 'Table Booking',
                                method: 'Debit',
                                amount: bookingDetails.walletAmountUsed,
                                date: Date.now()
                            } } });
                }
                //taking next day of the booking for changing the status
                const currentDate = new Date(bookingDetails.date);
                const nextDay = new Date(currentDate);
                nextDay.setDate(currentDate.getDate() + 1);
                const bookingConfirm = yield bookingsModel_1.default.updateOne({ restaurantId }, { $push: { bookings: bookingDetails } }, { upsert: true });
                node_schedule_1.default.scheduleJob(nextDay, function async() {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield bookingsModel_1.default.updateOne({
                            restaurantId,
                            'bookings.date': bookingDetails.date,
                            'bookings.time': bookingDetails.time,
                            'bookings.orderStatus': 1
                        }, {
                            $set: {
                                'bookings.$.orderStatus': 4
                            }
                        });
                    });
                });
                return bookingConfirm;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    tableCounts(restaurantId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seatCounts = yield bookingsModel_1.default.aggregate([
                    {
                        $match: {
                            restaurantId: new mongoose_1.Types.ObjectId(restaurantId)
                        }
                    },
                    {
                        $unwind: '$bookings'
                    },
                    {
                        $match: {
                            'bookings.table': { $exists: true },
                            'bookings.date': date,
                            'bookings.time': time
                        }
                    },
                    {
                        $group: {
                            _id: '$bookings.table',
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            _id: 0, // Exclude _id field from the result
                            table: '$_id',
                            count: 1
                        }
                    }
                ]);
                const restaurantDetails = yield restaurantModel_1.default.findOne({ _id: restaurantId }, { tableCounts: 1 });
                console.log(restaurantDetails === null || restaurantDetails === void 0 ? void 0 : restaurantDetails.tableCounts, seatCounts);
                if (restaurantDetails) {
                    const tableCounts = restaurantDetails.tableCounts;
                    const calculateDifference = () => {
                        const difference = {};
                        // Initialize difference with all possible table types and their full counts
                        Object.keys(tableCounts || {}).forEach((tableType) => {
                            // Assuming tableCounts values are meant to be numbers, convert them
                            let fullCount = (tableCounts === null || tableCounts === void 0 ? void 0 : tableCounts[tableType]) || 0;
                            fullCount = parseInt(fullCount);
                            difference[tableType] = fullCount;
                        });
                        seatCounts.forEach((item) => {
                            const tableType = item.table;
                            const countFromDict = (tableCounts === null || tableCounts === void 0 ? void 0 : tableCounts[tableType]) || 0;
                            const countFromList = item.count;
                            // Subtract the count from seatCounts
                            difference[tableType] -= countFromList;
                        });
                        return difference;
                    };
                    // Calculate the difference
                    const result = calculateDifference();
                    return result;
                }
                else {
                    console.log('Restaurant details not found.');
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //user bookings
    userBookings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('its here')
                // const bookings:any = await bookingModel.find({'bookings.user': userId}, {restaurantId: { $exists: true, $ne: null } } ).populate('restaurantId') as Array<Booking> | null
                // return bookings
                const bookings = yield bookingsModel_1.default.aggregate([
                    {
                        $match: {
                            'bookings.user': new mongoose_1.Types.ObjectId(userId),
                            restaurantId: { $ne: null }
                        }
                    },
                    {
                        $lookup: {
                            from: 'restaurants', // Assuming the name of the collection is 'restaurants'
                            localField: 'restaurantId',
                            foreignField: '_id',
                            as: 'restaurantId'
                        }
                    }
                ]);
                console.log(bookings);
                return bookings;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    //user booking cancellation
    userBookingCancellation(bookingId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingStatus = yield bookingsModel_1.default.findOneAndUpdate({
                    'bookings._id': bookingId
                }, {
                    $set: { 'bookings.$.orderStatus': 3, 'bookings.$.cancelReason': reason }
                }, { new: true });
                const bookingDetails = yield bookingsModel_1.default.findOne({ 'bookings._id': bookingId }, { 'bookings.$': 1 });
                const booking = bookingDetails === null || bookingDetails === void 0 ? void 0 : bookingDetails.bookings[0];
                const walletUpdate = yield userModel_1.default.updateOne({ _id: booking === null || booking === void 0 ? void 0 : booking.user }, { $inc: { wallet: (booking === null || booking === void 0 ? void 0 : booking.totalAmount) - 100 }, $push: { walletHistory: {
                            transactionType: 'Booking Cancellation',
                            method: 'Credit',
                            amount: (booking === null || booking === void 0 ? void 0 : booking.totalAmount) - 100,
                            date: Date.now()
                        } } });
                return bookingStatus;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //vendor
    //all booking lists
    allBookings(restaurantId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = 2;
                const skip = (page - 1) * limit;
                const result = yield bookingsModel_1.default.findOne({ restaurantId });
                const totalCount = (result === null || result === void 0 ? void 0 : result.bookings.length) || 0;
                const totalPages = Math.ceil(totalCount / limit);
                const allBookingDetails = (result === null || result === void 0 ? void 0 : result.bookings.slice(skip, skip + limit)) || [];
                return {
                    allBookingDetails,
                    totalPages,
                    currentPage: page
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //change booking status
    changeBookingStatus(bookingId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingStatus = yield bookingsModel_1.default.findOneAndUpdate({
                    'bookings._id': bookingId
                }, {
                    $set: { 'bookings.$.orderStatus': 2, 'bookings.$.cancelReason': reason }
                }, { new: true });
                const booking = bookingStatus === null || bookingStatus === void 0 ? void 0 : bookingStatus.bookings[0];
                console.log(booking);
                const walletUpdate = yield userModel_1.default.updateOne({ _id: booking === null || booking === void 0 ? void 0 : booking.user }, { $inc: { wallet: booking === null || booking === void 0 ? void 0 : booking.totalAmount }, $push: { walletHistory: {
                            transactionType: 'Booking Cancellation By Admin',
                            method: 'Credit',
                            amount: booking.totalAmount,
                            date: Date.now()
                        } } });
                return bookingStatus;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    salesChart(restaurantId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield bookingsModel_1.default.aggregate([
                    {
                        $match: {
                            'restaurantId': new mongoose_1.Types.ObjectId(restaurantId)
                        }
                    },
                    {
                        $unwind: "$bookings",
                    },
                    {
                        $match: {
                            "bookings.orderStatus": 4,
                        },
                    },
                    {
                        $addFields: {
                            bookingDate: {
                                $toDate: "$bookings.date",
                            },
                        },
                    },
                    {
                        $group: {
                            _id: {
                                month: { $month: "$bookingDate" },
                                year: { $year: "$bookingDate" },
                            },
                            totalAmount: {
                                $sum: {
                                    $add: [
                                        "$bookings.totalAmount",
                                        { $ifNull: ["$bookings.walletAmountUsed", 0] } // Use $ifNull to handle potential null values
                                    ]
                                }
                            },
                        },
                    },
                    {
                        $set: {
                            month: '$_id.month',
                            totalAmount: "$totalAmount",
                        },
                    },
                    {
                        $unset: "_id",
                    },
                ]);
                console.log(sales);
                const totalBookings = yield bookingsModel_1.default.aggregate([
                    {
                        $match: {
                            'restaurantId': new mongoose_1.Types.ObjectId(restaurantId)
                        }
                    },
                    {
                        $unwind: '$bookings',
                    },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 }
                        }
                    }
                ]);
                const bookingCount = ((_a = totalBookings[0]) === null || _a === void 0 ? void 0 : _a.count) || 0;
                const result = yield bookingsModel_1.default.aggregate([
                    {
                        $match: {
                            'restaurantId': new mongoose_1.Types.ObjectId(restaurantId),
                            'bookings.orderStatus': { $gt: 1, $lt: 4 }
                        }
                    },
                    {
                        $unwind: '$bookings',
                    },
                    {
                        $match: {
                            'bookings.orderStatus': { $gt: 1, $lt: 4 }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 },
                            totalAmount: { $sum: '$bookings.totalAmount' }
                        }
                    }
                ]);
                // console.log(result)
                const cancelledBookingAmount = ((_b = result[0]) === null || _b === void 0 ? void 0 : _b.totalAmount) || 0;
                const cancelledBookingCount = ((_c = result[0]) === null || _c === void 0 ? void 0 : _c.count) || 0;
                return {
                    sales,
                    bookingCount,
                    cancelledBookingCount,
                    cancelledBookingAmount
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //admin
    salesDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const revenueDetails = await bookingModel.aggregate([
                //     {
                //       $lookup: {
                //         from: "restaurants", // Replace with the actual name of your restaurant collection
                //         localField: "restaurantId",
                //         foreignField: "_id",
                //         as: "restaurant"
                //       }
                //     },
                //     {
                //       $unwind: "$restaurant"
                //     },
                //     {
                //       $match: {
                //         "restaurant.status": { $lt: 5, $gt: 1 }
                //       }
                //     },
                //     {
                //       $addFields: {
                //         "createdAt": {
                //           $toDate: "$restaurant.createdAt"
                //         }
                //       }
                //     },
                //     {
                //         $unwind:'$bookings'
                //     },
                //     {
                //       $group: {
                //         _id: {
                //           restaurantId: "$restaurantId",
                //           year: { $year: "$createdAt" },
                //           month: { $month: "$createdAt" },
                //           day: { $dayOfMonth: "$createdAt" }
                //         },
                //         totalBookings: { $sum: 1 },
                //         completedBookings: {
                //           $sum: {
                //             $cond: {
                //               if: { $eq: ["$bookings.orderStatus", 4] },
                //               then: 1,
                //               else: 0
                //             }
                //           }
                //         }
                //       }
                //     },
                //     {
                //       $group: {
                //         _id: {
                //           year: "$_id.year",
                //           month: "$_id.month"
                //         },
                //         counts: {
                //           $push: {
                //             restaurantId: "$_id.restaurantId",
                //             day: "$_id.day",
                //             totalBookings: "$totalBookings",
                //             completedBookings: "$completedBookings"
                //           }
                //         },
                //         restaurantCount: { $sum: "$totalBookings" },
                //         totalCompletedBookings: { $sum: "$completedBookings" }
                //       }
                //     },
                //     {
                //       $project: {
                //         _id: 0,
                //         year: "$_id.year",
                //         month: "$_id.month",
                //         // counts: 1,
                //         restaurantCount: 1,
                //         totalCompletedBookings: 1
                //       }
                //     }
                //   ]);
                const desiredYear = '2023';
                const revenueDetails = yield bookingsModel_1.default.aggregate([
                    {
                        $lookup: {
                            from: "restaurants",
                            localField: "restaurantId",
                            foreignField: "_id",
                            as: "restaurant"
                        }
                    },
                    {
                        $unwind: "$restaurant"
                    },
                    {
                        $match: {
                            "restaurant.status": { $lt: 5, $gt: 1 },
                            "restaurant.createdAt": {
                                $gte: new Date(desiredYear),
                                $lt: new Date(`${parseInt(desiredYear) + 1}`)
                            }
                        }
                    },
                    {
                        $addFields: {
                            "createdAt": {
                                $toDate: "$restaurant.createdAt"
                            }
                        }
                    },
                    {
                        $unwind: "$bookings"
                    },
                    {
                        $group: {
                            _id: {
                                restaurantId: "$restaurantId",
                                year: { $year: "$createdAt" },
                                month: { $month: "$createdAt" },
                                day: { $dayOfMonth: "$createdAt" }
                            },
                            totalBookings: { $sum: 1 },
                            completedBookings: {
                                $sum: {
                                    $cond: {
                                        if: { $eq: ["$bookings.orderStatus", 4] },
                                        then: 1,
                                        else: 0
                                    }
                                }
                            }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                year: "$_id.year",
                                month: "$_id.month"
                            },
                            counts: {
                                $push: {
                                    restaurantId: "$_id.restaurantId",
                                    day: "$_id.day",
                                    totalBookings: "$totalBookings",
                                    completedBookings: "$completedBookings"
                                }
                            },
                            restaurantCount: { $sum: "$totalBookings" },
                            totalCompletedBookings: { $sum: "$completedBookings" }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            year: "$_id.year",
                            month: "$_id.month",
                            restaurantCount: 1,
                            totalCompletedBookings: 1
                        }
                    }
                ]);
                const totalUsers = yield userModel_1.default.find({}).countDocuments();
                const totalVendors = yield vendorModel_1.default.find({}).countDocuments();
                const totalRestaurants = yield restaurantModel_1.default.find({}).countDocuments();
                console.log(revenueDetails, totalUsers, totalVendors, totalRestaurants);
                return {
                    revenueDetails,
                    totalUsers,
                    totalVendors,
                    totalRestaurants
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = bookingRepository;
