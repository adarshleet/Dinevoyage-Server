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
const stripe_1 = __importDefault(require("stripe"));
const stripeApi = process.env.STRIPE_API;
const stripe = new stripe_1.default(stripeApi);
class StripePayment {
    makePayment(totalPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            const lineItems = [{
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'test'
                        },
                        unit_amount: totalPrice * 100
                    },
                    quantity: 1
                }];
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: 'payment',
                success_url: 'http://localhost:3000/bookingConfirmed',
                cancel_url: 'https://localhost:3000/cancel'
            });
            console.log("Stripe Checkout Session ID:", session.id);
            return session.id;
        });
    }
}
exports.default = StripePayment;
