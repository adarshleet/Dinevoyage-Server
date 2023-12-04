import Coupon from "../../domain/coupon";

interface couponRepository{
    addCoupon(coupon:Coupon)
    getAllCoupon(page:number)
    couponInCheckout(userId:string)
}

export default couponRepository