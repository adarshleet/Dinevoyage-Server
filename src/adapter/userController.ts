import { Request, Response } from "express";
import Userusecase from "../usecase/userUsecase";
import User from "../domain/user";

class userController {
    private userUsecase: Userusecase
    constructor(userUsecase: Userusecase) {
        this.userUsecase = userUsecase
    }
    async signUp(req: Request, res: Response) {
        try {
            const user = req.body
            console.log(user)
            const userFound = await this.userUsecase.mobileExistCheck(user.mobile)
            if (!userFound.data) {
                req.app.locals = user
                const verify = await this.userUsecase.verifyMobile(user.mobile)
                res.status(200).json(verify)
            }else{
                res.status(200).json('mobile number already existing')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async otpVerification(req: Request, res: Response) {
        try {
            const user: User = req.app.locals as User
            const  otp  = req.body.otp
            console.log('here',otp)
            const verifyOtp = await this.userUsecase.verifyOtp(user.mobile, otp)
            if (verifyOtp.data) {
                const userSave = await this.userUsecase.saveUser(user)
                res.status(200).json(userSave)
            }
            return verifyOtp
        } catch (error) {
            console.log(error)
        }
    }


    async login(req:Request,res:Response){
        try {
            const user = req.body
            const loginStatus = await this.userUsecase.userLogin(user)
            if(loginStatus.data && typeof loginStatus.data === 'object' && 'token' in loginStatus.data){
                res.cookie('userJWT', loginStatus.data.token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000
                });
            }
            res.status(loginStatus.status).json(loginStatus)
        } catch (error) {
            console.log(error)
        }
    }
}

export default userController