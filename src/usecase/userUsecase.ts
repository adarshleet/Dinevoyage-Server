import User from "../domain/user"
import userRepository from "../infrastructure/repository/userRepository"
import TwilioService from './../infrastructure/utils/twilio'
import Encrypt from "../infrastructure/utils/hashPassword"
import JwtCreate from "../infrastructure/utils/jwtCreate"


class Userusecase {
    private userRepository: userRepository
    private twilioService: TwilioService
    private Encrypt: Encrypt
    private jwtCreate: JwtCreate

    constructor(userRepository: userRepository, twilioService: TwilioService, Encrypt: Encrypt, jwtCreate: JwtCreate) {
        this.userRepository = userRepository
        this.twilioService = twilioService
        this.Encrypt = Encrypt
        this.jwtCreate = jwtCreate
    }


    //saving user to database
    async saveUser(user: User) {
        try {
            const hashedPassword = await this.Encrypt.createHash(user.password)
            user.password = hashedPassword
            const userSave = await this.userRepository.save(user)
            return {
                status: 200,
                data: userSave
            }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }





    //sending otp to given mobile number
    async verifyMobile(mobile: string) {
        try {
            const verify = await this.twilioService.sendTwilioOtp(mobile)
            return {
                status: 200,
                data: verify,
            }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }


    //verifying mobile and otp
    async verifyOtp(mobile: string, otp: string) {
        try {
            const verifyOtp = await this.twilioService.verifyOtp(mobile, otp)
            return {
                status: 200,
                data: verifyOtp
            }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }


    //checking mobile number exist on database
    async mobileExistCheck(mobile: string) {
        try {
            const userFound = await this.userRepository.mobileExistCheck(mobile)
            return {
                status: 200,
                data: userFound
            }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }

    //checking user mobile exist and compare password
    async userLogin(user: { mobile: string, password: string }) {
        try {
            const userFound: any = await this.userRepository.mobileExistCheck(user.mobile)
            console.log(userFound)
            if (userFound) {
                const passwordMatch = await this.Encrypt.compare(user.password, userFound.password)
                const token = this.jwtCreate.createJwt(userFound._id)
                if (passwordMatch) {
                    return {
                        status: 200,
                        data: {
                            success :true,
                            message: 'authentication succesfull',
                            userId: userFound._id,
                            token: token
                        }
                    }
                } else {
                    return {
                        status: 200,
                        data: {
                            success :false,
                            message: 'invalid mobile or password',
                        }
                    }
                }
            }
            else {
                return {
                    status: 200,
                    data: {
                        success:false,
                        message: 'invalid mobile or password',
                    }
                }
            }
        } catch (error) {
            return {
                status: 400,
                data: error
            }
        }
    }

}

export default Userusecase