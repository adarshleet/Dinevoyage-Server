import Stripe from "stripe";
// const stripeApi = process.env.STRIPE_API as string
const stripeApi = 'sk_test_51OEOTHSFAVCVwY62x0N8IvUkwA0QkI6nQmji6nwfmLV9PaVNu2z575ruttZagRdBqeabY1IUC43GbxUEn3SogR4g00fnJRhx0T'

const stripe = new Stripe(stripeApi)

import IStripe from "../../usecase/interface/stripe";

class StripePayment implements IStripe{
    async makePayment(totalPrice:number) {
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

        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:'payment',
            success_url: 'http://localhost:3000/bookingConfirmed',
            cancel_url : 'https://localhost:3000/cancel'
        })

        console.log("Stripe Checkout Session ID:", session.id);
        return session.id
    }
}

export default StripePayment