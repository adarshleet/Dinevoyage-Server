import { Request,Response } from "express";
import CouponUsecase from "../usecase/couponUsecase";
import jwt,{JwtPayload} from "jsonwebtoken";

class CouponController{
    private CouponUsecase : CouponUsecase

    constructor(CouponUsecase:CouponUsecase){
        this.CouponUsecase = CouponUsecase
    }

    async addCoupon(req:Request,res:Response){
        try {
            const coupon = req.body
            const couponAdd = await this.CouponUsecase.addCoupon(coupon)
            res.status(200).json(couponAdd)
        } catch (error) {
            console.log(error)
        }
    }


    async allCoupons(req:Request,res:Response){
        try {
            const page = parseInt(req.query.page as string)
            const allCoupons = await this.CouponUsecase.getAllCoupons(page)
            res.status(200).json(allCoupons)
        } catch (error) {
            console.log(error)
        }
    }

    async couponToShow(req:Request,res:Response){
        try {
            let userId
            const token = req.cookies.userJWT
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id
            }


            const couponToShow = await this.CouponUsecase.couponToShow(userId)
            res.status(200).json(couponToShow)
            
        } catch (error) {
            console.log(error)
        }
    }

}

export default CouponController