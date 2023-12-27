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
const twilio_1 = require("twilio");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const serviceID = process.env.SERVICE_SID;
const accountSID = process.env.ACC_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio_1.Twilio(accountSID, authToken);
class TwilioService {
    sendTwilioOtp(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (serviceID) {
                    yield client.verify.v2
                        .services(serviceID).verifications.create({
                        to: `+91${mobile}`,
                        channel: "sms",
                    });
                }
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    verifyOtp(mobile, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (serviceID) {
                    const var_check = yield client.verify.v2
                        .services(serviceID)
                        .verificationChecks.create({ to: `+91${mobile}`, code: otp });
                    return var_check.status === "approved";
                }
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
