import Stripe from "stripe";
const stripeApi = process.env.STRIPE_API as string
const stripe = new Stripe(stripeApi)

import IStripe from "../../usecase/interface/stripe";

class StripePayment implements IStripe{
    async makePayment(totalPrice:number) {
        console.log('here')
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