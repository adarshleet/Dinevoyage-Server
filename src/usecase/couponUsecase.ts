import couponRepository from "./interface/couponRepository";
import Coupon from "../domain/coupon";

class CouponUsecase{
    private couponRepository : couponRepository
    constructor(couponRepository:couponRepository){
        this.couponRepository = couponRepository
    }

    async addCoupon(coupon:Coupon){
        try {
            const couponAdd = await this.couponRepository.addCoupon(coupon)
            return{
                status:200,
                data:couponAdd
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }



    async getAllCoupons(page:number){
        try {
            const allCoupons = await this.couponRepository.getAllCoupon(page)
            return{
                status:200,
                data:allCoupons
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    async couponToShow(userId:string){
        try {
            const couponToShow = await this.couponRepository.couponInCheckout(userId)
            return{
                status:200,
                data:couponToShow
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


}


export default CouponUsecase