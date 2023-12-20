import { ObjectId } from "mongoose"

interface Booking {
    restaurantId?: string;
    user?: ObjectId;
    name?: string;
    guestCount?: number;
    mobile?: string;
    time?: string;
    date?: string;
    totalAmount?: number;
    items?: {
        itemName?: string;
        price?: number;
        count?: number;
    };
    appliedCoupon?: {
        couponName?: string;
    };
    walletAmountUsed?: number
}

export default Booking