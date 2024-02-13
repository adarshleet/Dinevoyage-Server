import User from "../domain/user"
import userRepository from "../infrastructure/repository/userRepository"
import TwilioService from '../infrastructure/utils/otpServices'
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
            console.log('here also')
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
    async verifyOtp(mobile: string, otp: string,orderId:string) {
        try {
            const verifyOtp = await this.twilioService.verifyOtp(mobile, otp,orderId)
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


    //change mobile
    async changeMobile(userId:string,mobile:string){
        try {
            console.log(mobile)
            const mobileChangeStatus = await this.userRepository.mobileChange(userId,mobile)
            return{
                status:200,
                data:mobileChangeStatus
            }
        } catch (error) {
            return{
                status:400,
                data:error
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


    //email exist check
    async emailExistCheck(email:string){
        try {
            const userFound = await this.userRepository.emailExistCheck(email)
            return{
                status:200,
                data:userFound
            }
        } catch (error) {
            return{
                status:200,
                data:error
            }
        }
    }

    //checking user mobile exist and compare password
    async userLogin(user:any) {
        try {
            let userFound:any
            if(user.isGoogle){
                userFound = await this.userRepository.emailExistCheck(user.email)
            }
            else{
                userFound = await this.userRepository.mobileExistCheck(user.mobile)
            }
            console.log(userFound)
            if (userFound) {
                if(userFound.isBlocked){
                    return {
                        status: 200,
                        data: {
                            success : false,
                            message: 'You have been blocked',
                        }
                    }
                }
                const passwordMatch = await this.Encrypt.compare(user.password, userFound.password)
                if (passwordMatch) {
                    const token = this.jwtCreate.createJwt(userFound._id,'user')
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



    //find user by id
    async findUser(user:string){
        try {
            const userFound = await this.userRepository.findUserById(user)
            return{
                status:200,
                data:userFound
            }
        } catch (error) {
            return{
                status:400,
                return:error
            }
        }
    }


    //user name change
    async changeName(userId:string,name:string){
        try {
            const nameChangeStatus = await this.userRepository.usernameChange(userId,name)
            return{
                status:200,
                data:nameChangeStatus
            }
        } catch (error) {
            return{
                status:200,
                data:error
            }
        }
    }


    

    //password change
    async changePassword(userId:string,password:string,currentPassword:string){
        try {
            const userFound = await this.userRepository.findUserById(userId)
            if(userFound){
                const passwordMatch = await this.Encrypt.compare(currentPassword,userFound.password as string)
                if(passwordMatch){
                    const hashedPassword = await this.Encrypt.createHash(password) 
                    const passwordChangeStatus = await this.userRepository.changePassword(userId,hashedPassword)
                    return{
                        status:200,
                        data:passwordChangeStatus
                    }
                }
                else{
                    return{
                        status:200,
                        data:passwordMatch
                    }
                }
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }



    // change password forgot
    async forgotPasswordChange(mobile:string,password:string){
        try {
            const hashedPassword = await this.Encrypt.createHash(password) 
            const passwordChange = await this.userRepository.forgotPasswordChange(mobile,hashedPassword)
            return{
                status:200,
                data:passwordChange
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }



    //restaurants showing
    async restaurantsToDisplay(page:number){
        try {
            const restaurants = await this.userRepository.restaurantsToShow(page)
            return{
                status:200,
                data:restaurants
            }
        } catch (error) {
            console.log(error)
        }
    }


    //restaurants for displaying in map
    async restaurantsForMap(){
        try {
            const restaurants = await this.userRepository.restaurantsToShowInMap()
            return{
                status:200,
                data:restaurants
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    //single restaurant page
    async singleRestaurant(restauarantId:string){
        try {
            const restaurant = await this.userRepository.singleRestaurant(restauarantId)
            return{
                status:200,
                data:restaurant
            }
        } catch (error) {
            console.log(error);
        }
    }






}

export default Userusecase