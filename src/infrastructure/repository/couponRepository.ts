import couponModel from "../database/couponModal";
import couponRepository from "../../usecase/interface/couponRepository";
import Coupon from "../../domain/coupon";

class CouponRepository implements couponRepository{
    async addCoupon(coupon: Coupon) {
        try {
            const date = new Date()
            const couponDate = new Date(coupon.expiryDate)

            if(couponDate < date){
                return{
                    data:false,
                    message : 'Past Date Cannot be applied to expiry date'
                }
            }


            const couponFound = await couponModel.findOne({couponName:coupon.couponName})
            if(couponFound){
                return{
                    data:false,
                    message: 'Already existing coupon name'
                }
            }


            const couponToAdd = new couponModel(coupon)
            const couponAdd = await couponToAdd.save()
            return {
                data:couponAdd
            }

        } catch (error) {
            console.log(error)
        }
    }


    async getAllCoupon(page:number) {
        try {
            const limit = 5
            const allCoupons = await couponModel.find({}).skip((page-1)*limit).limit(limit)
            const totalCoupons = await couponModel.find().countDocuments()
            const totalPages = Math.floor(totalCoupons/limit)
            return {
                allCoupons,
                totalPages
            }

        } catch (error) {
            console.log(error)
        }
    }


    async couponInCheckout(userId: string) {
        try {
            const couponToShow = await couponModel.find({isListed:true , usedUsers:{$nin:userId}})
            return couponToShow
        } catch (error) {
            console.log(error)
        }
    }

}

export default CouponRepository