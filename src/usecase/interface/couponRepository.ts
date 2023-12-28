import Coupon from "../../domain/coupon";

interface couponRepository{
    addCoupon(coupon:Coupon):Promise<any>
    getAllCoupon(page:number):Promise<any>
    couponInCheckout(userId:string):Promise<any>
    editCoupon(coupon:Coupon):Promise<any>
    couponStatusChange(id:string):Promise<any>
}

export default couponRepository