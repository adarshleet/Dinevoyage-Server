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
class BookingUsecase {
    constructor(bookingRepository, StripePayment) {
        this.bookingRepository = bookingRepository;
        this.StripePayment = StripePayment;
    }
    dateSeatDetails(restaurantId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seatDetails = yield this.bookingRepository.dateSeatDetails(restaurantId, date, time);
                return {
                    status: 200,
                    data: seatDetails
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
    confirmBooking(bookingDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingConfirm = yield this.bookingRepository.confirmBooking(bookingDetails);
                return {
                    status: 200,
                    data: bookingConfirm
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
    tableCounts(restaurantId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const seatCounts = yield this.bookingRepository.tableCounts(restaurantId, date, time);
                return {
                    status: 200,
                    data: seatCounts
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    makePayment(bookingDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalPrice = bookingDetails === null || bookingDetails === void 0 ? void 0 : bookingDetails.totalAmount;
                const paymentDetails = yield this.StripePayment.makePayment(totalPrice);
                return {
                    status: 200,
                    data: paymentDetails
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //all booking for user
    userBookings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield this.bookingRepository.userBookings(userId);
                return {
                    status: 200,
                    data: bookings
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
    //user booking cancellation
    userBookingCancellation(bookingId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingStatus = yield this.bookingRepository.userBookingCancellation(bookingId, reason);
                return {
                    status: 200,
                    data: bookingStatus
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
    //vendor
    //all bookings
    allBookings(restaurantId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allBookingDetails = yield this.bookingRepository.allBookings(restaurantId, page);
                return {
                    status: 200,
                    data: allBookingDetails
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
    //change booking status
    changeBookingStatus(bookingId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingStatus = yield this.bookingRepository.changeBookingStatus(bookingId, reason);
                return {
                    status: 200,
                    data: bookingStatus
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
    salesChart(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield this.bookingRepository.salesChart(restaurantId);
                return {
                    status: 200,
                    data: sales
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
    //admin dashboad
    adminDashboard() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dashboard = yield this.bookingRepository.salesDetails();
                return {
                    status: 200,
                    data: dashboard
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
exports.default = BookingUsecase;
