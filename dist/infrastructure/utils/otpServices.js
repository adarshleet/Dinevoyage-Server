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
// @ts-ignore
const otpless_node_js_auth_sdk_1 = require("otpless-node-js-auth-sdk");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class TwilioService {
    sendTwilioOtp(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(process.env.OTP_CLIENT_ID, process.env.OTP_CLIENT_SECRET);
                const response = yield (0, otpless_node_js_auth_sdk_1.sendOTP)(`91${mobile}`, null, 'SMS', undefined, undefined, 60, 6, process.env.OTP_CLIENT_ID, process.env.OTP_CLIENT_SECRET);
                return response.orderId;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    verifyOtp(mobile, otp, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, otpless_node_js_auth_sdk_1.verifyOTP)(null, `+91${mobile}`, orderId, otp, process.env.OTP_CLIENT_ID, process.env.OTP_CLIENT_SECRET);
                console.log(response);
                return response.isOTPVerified;
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
}
exports.default = TwilioService;
