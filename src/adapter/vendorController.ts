import e, { Request, Response } from "express";
import Vendorusecase from "../usecase/vendorUsecase";
import Vendor from "../domain/vendor";
import jwt,{JwtPayload} from "jsonwebtoken";


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


    //get vendor details
    async getVendorDetails(req:Request,res:Response){
        try {

            const token = req.cookies.vendorJWT
            let vendorId
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                vendorId = decoded.id
            }

            const vendorDetails = await this.vendorUsecase.getVendorDetails(vendorId)
            res.status(200).json(vendorDetails)

        } catch (error) {
            console.log(error)
        }
    }



    //change vendor name
    async changeVendorName(req:Request,res:Response){
        try {
            
            const token = req.cookies.vendorJWT
            let vendorId
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                vendorId = decoded.id
            }

            const name = req.body.name
            const vendorNameChange = await this.vendorUsecase.changeVendorName(vendorId,name)
            res.status(200).json(vendorNameChange)

        } catch (error) {
            console.log(error)
        }
    }

    //verify new mobile
    async verifyNewMobile(req:Request,res:Response){
        try {

            const mobile = req.body.mobile
            const vendorFound= await this.vendorUsecase.mobileExistCheck(mobile)
            if(vendorFound.data){
                res.status(200).json({data:false})
            }
            else{
                const verifyMobileStatus = await this.vendorUsecase.verifyMobile(mobile)
                res.status(200).json(verifyMobileStatus)
            }
        } catch (error) {
            console.log(error)
        }
    }


    //change mobile
    async changeMobile(req:Request,res:Response){
        try {
            const {mobile,otp} = req.body
            const token = req.cookies.vendorJWT
            let vendorId
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                vendorId = decoded.id
            }

            const changeMobileStatus = await this.vendorUsecase.changeMobile(vendorId,mobile,otp)
            res.status(200).json(changeMobileStatus)


        } catch (error) {
            console.log(error)
        }
    }



    //change password
    async changePassword(req:Request,res:Response){
        try {
            const {newPassword,currentPassword} = req.body

            const token = req.cookies.vendorJWT
            let vendorId
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                vendorId = decoded.id
            }

            const passwordChangeStatus = await this.vendorUsecase.changePassword(vendorId,newPassword,currentPassword)
            res.status(200).json(passwordChangeStatus)
        } catch (error) {
            console.log(error)
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