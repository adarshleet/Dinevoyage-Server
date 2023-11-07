import { Request, Response } from "express";
import Vendorusecase from "../usecase/vendorUsecase";
import Vendor from "../domain/vendor";


class vendorController {
    private vendorUsecase: Vendorusecase
    constructor(vendorUsecase: Vendorusecase) {
        this.vendorUsecase = vendorUsecase
    }

    async vendorRegister(req: Request, res: Response) {
        try {
            const vendor = req.body
            // console.log(vendor)
            if (vendor.isGoogle) {
                const vendorFound = await this.vendorUsecase.emailExistCheck(vendor.email)
                if (!vendorFound.data) {
                    const vendorSave = await this.vendorUsecase.saveVendor(vendor)
                    res.status(200).json({data:true,vendorSave})
                } else {
                    res.status(200).json({ data: false, message: 'Email Id already in use' })
                }
            }
            else {
                const vendorFound = await this.vendorUsecase.mobileExistCheck(vendor.mobile)
                console.log(vendorFound)
                if (!vendorFound.data) {
                    req.app.locals = vendor
                    const verify = await this.vendorUsecase.verifyMobile(vendor.mobile)
                    res.status(200).json(verify)
                }
                else {
                    res.status(200).json({ data: false, message: 'Mobile number already registered' })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async otpVerification(req: Request, res: Response) {
        try {
            const vendor: Vendor = req.app.locals as Vendor
            const otp = req.body.otp
            // console.log(otp, vendor)
            const verifyOtp = await this.vendorUsecase.verifyOtp(vendor.mobile, otp)
            // console.log(verifyOtp)
            if (verifyOtp.data) {
                const vendorSave = await this.vendorUsecase.saveVendor(vendor)
            }
            res.status(200).json(verifyOtp)
        } catch (error) {
            console.log(error)
        }
    }


    async login(req: Request, res: Response) {
        try {
            const vendor = req.body
            console.log(vendor)
            const loginStatus = await this.vendorUsecase.vendorLogin(vendor)
            console.log(loginStatus)
            if (loginStatus.data && typeof loginStatus.data === 'object' && 'token' in loginStatus.data) {
                console.log('hererere')
                res.cookie('vendorJWT', loginStatus.data.token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000
                });
            }
            res.status(loginStatus.status).json(loginStatus)
        } catch (error) {
            console.log(error);

        }
    }


    async vendorLogout(req: Request, res: Response) {
        try {
            res.cookie('vendorJWT', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            res.status(200).json({ success: true })
        } catch (error) {
            console.log(error)
        }
    }


    


}

export default vendorController