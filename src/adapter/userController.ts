import { Request, Response, json } from "express";
import Userusecase from "../usecase/userUsecase";
import User from "../domain/user";
import jwt,{JwtPayload} from "jsonwebtoken";


class userController {
    private userUsecase: Userusecase
    constructor(userUsecase: Userusecase) {
        this.userUsecase = userUsecase
    }
    async signUp(req: Request, res: Response) {
        try {
            const user = req.body
            console.log(user)
            if (user.isGoogle) {
                const userFound = await this.userUsecase.emailExistCheck(user.email)
                if (!userFound.data) {
                    const userSave = await this.userUsecase.saveUser(user)
                    res.status(200).json({data:true,userSave})
                } else {
                    res.status(200).json({ data: false, message: 'Email Id already in use' })
                }
            }
            else {
                const userFound = await this.userUsecase.mobileExistCheck(user.mobile)
                if (!userFound.data) {
                    req.app.locals = user
                    const verify = await this.userUsecase.verifyMobile(user.mobile)
                    req.app.locals.orderId = verify.data
                    res.status(200).json(verify)
                } else {
                    res.status(200).json({ data: false, message: 'Mobile number already in use' })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async otpVerification(req: Request, res: Response) {
        try {
            const user: User = req.app.locals as User
            const otp = req.body.otp
            const orderId = req.app.locals.orderId
            const verifyOtp = await this.userUsecase.verifyOtp(user.mobile, otp,orderId)
            if (verifyOtp.data) {
                const userSave = await this.userUsecase.saveUser(user)
            }
            res.status(200).json(verifyOtp)
        } catch (error) {
            console.log(error)
        }
    }


    async login(req: Request, res: Response) {
        try {
            const user = req.body
            const loginStatus = await this.userUsecase.userLogin(user)
            if (loginStatus.data && typeof loginStatus.data === 'object' && 'token' in loginStatus.data) {
                res.cookie('userJWT', loginStatus.data.token, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure : process.env.NODE_ENV !== 'development',
                    maxAge: 30 * 24 * 60 * 60 * 1000 , 
                });
            }
            
            res.status(loginStatus.status).json(loginStatus)
        } catch (error) {
            console.log(error)
        }
    }


    //find user by id
    async findUser(req:Request,res:Response){
        try {
            let userId
            const token = req.cookies.userJWT
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id
            }

            const userFound = await this.userUsecase.findUser(userId)
            res.status(200).json(userFound)

        } catch (error) {
            console.log(error)
        }
    }

    async findUserById(req:Request,res:Response){
        try {
            const userId = req.query.userId as string
            const userFound = await this.userUsecase.findUser(userId)
            res.status(200).json(userFound)
        } catch (error) {
            console.log(error)
        }
    }


    //change user name
    async changeName(req:Request,res:Response){
        try {
            const name = req.body.name

            let userId
            const token = req.cookies.userJWT
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id
            }

            const nameChangeStatus = await this.userUsecase.changeName(userId,name)
            res.status(200).json(nameChangeStatus)

        } catch (error) {
            console.log(error)
        }
    }


    //otp sending for mobile change
    async verifyNewMobile(req:Request,res:Response){
        try {
            const mobile = req.body.mobile
            
            const userFound = await this.userUsecase.mobileExistCheck(mobile)
                if (!userFound.data) {
                    req.app.locals = mobile
                    const verify = await this.userUsecase.verifyMobile(mobile)
                    res.status(200).json(verify)
                } else {
                    res.status(200).json({ data: false, message: 'Mobile number already in use' })
                }

        } catch (error) {
            console.log(error)
        }
    }

    //change mobile
    async changeMobile(req:Request,res:Response){
        try {
            const {otp,mobile} = req.body
            let userId
            const token = req.cookies.userJWT
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id
            }

            const orderId = req.app.locals.orderId
            const verifyOtp = await this.userUsecase.verifyOtp(mobile, otp,orderId)
            if (verifyOtp.data) {
                console.log(mobile)
                const userSave = await this.userUsecase.changeMobile(userId,mobile)
            }
            res.status(200).json(verifyOtp)

        } catch (error) {
            console.log(error)
        }
    }


    //change password
    async changePassword(req:Request,res:Response){
        try {
            const {currentPassword,newPassword} = req.body

            let userId
            const token = req.cookies.userJWT
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id
            }


            const passwordChangeStatus = await this.userUsecase.changePassword(userId,newPassword,currentPassword)
            res.status(200).json(passwordChangeStatus)

        } catch (error) {
            console.log(error)
        }
    }


    async forgotPassword(req:Request,res:Response){
        try {
            const mobile = req.query.mobile as string | any
            const userFound = await this.userUsecase.mobileExistCheck(mobile)
            console.log(mobile)

            if (userFound.data) {
                req.app.locals = mobile
                const verify = await this.userUsecase.verifyMobile(mobile)
                res.status(200).json(verify)
            } else {
                res.status(200).json({ data: false, message: 'Mobile number not registered' })
            }


        } catch (error) {
            console.log(error)
        }
    }


    //verifyMobile for forgot password
    async verifyMobile(req:Request,res:Response){
        try {
            const otp = req.body.otp
            const mobile = req.app.locals as string | any
            const orderId = req.app.locals.orderId
            const mobileVerify = await this.userUsecase.verifyOtp(mobile,otp,orderId)
            res.status(200).json(mobileVerify)
        } catch (error) {
            console.log(error)
        }
    }


    //forgot password change
    async forgotPasswordChange(req:Request,res:Response){
        try {
            const password = req.body.password
            const mobile = req.app.locals as string | any
            const passwordChange = await this.userUsecase.forgotPasswordChange(mobile,password)
            res.status(200).json(passwordChange)
        } catch (error) {
            console.log(error)
        }
    }


    async userLogout(req: Request, res: Response) {
        try {
            res.cookie('userJWT', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            res.status(200).json({ success: true })
        } catch (error) {
            console.log(error)
        }
    }



    async restaurantsToDisplay(req:Request,res:Response){
        try {
            const page = parseInt(req.query.page as string)
            const restaurants = await this.userUsecase.restaurantsToDisplay(page)
            res.status(200).json(restaurants)
        } catch (error) {
            console.log(error)
        }
    }


    async restaurantsForMap(req:Request,res:Response){
        try {
            const restaurants = await this.userUsecase.restaurantsForMap()
            console.log(restaurants)
            res.status(200).json(restaurants)
        } catch (error) {
            console.log(error)
        }
    }


    async singleRestaurant(req:Request,res:Response){
        try {
            const restaurantId = req.query.restaurantId as string
            const restaurant = await this.userUsecase.singleRestaurant(restaurantId)
            res.status(200).json(restaurant)
        } catch (error) {
            console.log(error)
        }
    }



}

export default userController