"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
class Session {
    constructor() {
        this.sessionOptions = {
            secret: 'your_secret_key',
            resave: false,
            saveUninitialized: false,
        };
    }
    sessionSetup(req, data) {
        (0, express_session_1.default)(this.sessionOptions)(req, {}, () => { });
        const sessionData = req.session;
        sessionData.bookingDetails = data;
        return sessionData.bookingDetails;
    }
}
exports.default = Session;
