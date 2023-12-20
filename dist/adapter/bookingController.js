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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class BookingController {
    constructor(bookingUsecase, session) {
        this.bookingUsecase = bookingUsecase;
        this.session = session;
    }
    dateSeatDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                const { date, time } = req.body;
                const seatDetails = yield this.bookingUsecase.dateSeatDetails(restaurantId, date, time);
                res.status(200).json(seatDetails);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    confirmBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingDetails = req.app.locals;
                if (req.body.data.object.status == 'complete') {
                    const bookingConfirm = yield this.bookingUsecase.confirmBooking(bookingDetails);
                    res.status(200).json(bookingConfirm);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    bookingWithWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingDetails = req.body;
                //user id for booking reference
                const token = req.cookies.userJWT;
                let user;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    user = decoded.id;
                }
                bookingDetails.user = user;
                const bookingConfirm = yield this.bookingUsecase.confirmBooking(bookingDetails);
                res.status(200).json(bookingConfirm);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    tableCounts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const guestData = req.body;
                yield this.session.sessionSetup(req, guestData);
                const sessionDetails = req.session;
                const seatCounts = yield this.bookingUsecase.tableCounts(guestData.restaurantId, guestData.date, guestData.time);
                res.status(200).json({ seatCounts, sessionDetails });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //payment
    makePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingDetails = req.body;
                console.log(bookingDetails);
                //user id for booking reference
                const token = req.cookies.userJWT;
                let user;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    user = decoded.id;
                }
                bookingDetails.user = user;
                req.app.locals = bookingDetails;
                yield this.session.sessionSetup(req, bookingDetails);
                const sessionDetails = req.session;
                const paymentDetails = yield this.bookingUsecase.makePayment(bookingDetails);
                res.status(200).json(paymentDetails);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //user all bookings
    userBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //user id for booking reference
                const token = req.cookies.userJWT;
                let user;
                if (token) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                    user = decoded.id;
                }
                const bookings = yield this.bookingUsecase.userBookings(user);
                res.status(200).json(bookings);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //user booking cancellation
    userBookingCancellation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.query.bookingId;
                const { reason } = req.body;
                const bookingStatus = yield this.bookingUsecase.userBookingCancellation(bookingId, reason);
                res.status(200).json(bookingStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //vendor
    //all booking details
    allBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                const page = parseInt(req.query.page);
                const allBookingDetails = yield this.bookingUsecase.allBookings(restaurantId, page);
                res.status(200).json(allBookingDetails);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //change booking status
    changeBookingStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.query.bookingId;
                const { reason } = req.body;
                console.log(reason);
                const bookingStatus = yield this.bookingUsecase.changeBookingStatus(bookingId, reason);
                res.status(200).json(bookingStatus);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //sales chart
    salesChart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = req.query.restaurantId;
                console.log(restaurantId);
                const sales = yield this.bookingUsecase.salesChart(restaurantId);
                res.status(200).json(sales);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //admin dashboard
    adminDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('ger');
                const dashboard = yield this.bookingUsecase.adminDashboard();
                res.status(200).json(dashboard);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = BookingController;
