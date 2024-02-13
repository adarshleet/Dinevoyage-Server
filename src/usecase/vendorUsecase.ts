import Vendor from "../domain/vendor";
import VendorRepository from "./interface/vendoRepository";
import TwilioService from '../infrastructure/utils/otpServices'
import Encrypt from "../infrastructure/utils/hashPassword"
import JwtCreate from "../infrastructure/utils/jwtCreate"

class Vendorusecase {
    private vendorRepository:VendorRepository
    private twilioService : TwilioService
    private encrypt : Encrypt
    private jwtCreate : JwtCreate

    constructor(vendorRepository:VendorRepository,twilioService:TwilioService,encrypt:Encrypt,jwtCreate:JwtCreate){
        this.vendorRepository = vendorRepository
        this.twilioService = twilioService
        this.encrypt = encrypt
        this.jwtCreate = jwtCreate
    }


    async mobileExistCheck(mobile:string){
        try {
            const vendorFound = await this.vendorRepository.mobileExistCheck(mobile)
            return{
                status:200,
                data:vendorFound
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }



    async emailExistCheck(email:string){
        try {
            const vendorFound = await this.vendorRepository.emailExistCheck(email)
            return{
                status:200,
                data : vendorFound
            }
        } catch (error) {
            return{
                status:400,
                data:error
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

    async saveVendor(vendor:Vendor){
        try {
            const hashedPassword = await this.encrypt.createHash(vendor.password)
            vendor.password = hashedPassword
            const vendorSave = await this.vendorRepository.saveVendor(vendor)
            console.log(vendorSave)
            return{
                status:200,
                data:vendorSave
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }
    

    async vendorLogin(vendor:any){
        try {
            let vendorFound:any
            if(vendor.isGoogle){
                vendorFound = await this.vendorRepository.emailExistCheck(vendor.email)
            }else{
                vendorFound= await this.vendorRepository.mobileExistCheck(vendor.mobile)
            }
            if(vendorFound){
                if(vendorFound.isBlocked){
                    return {
                        status: 200,
                        data: {
                            success :false,
                            message: 'You have been blocked',
                        }
                    }
                }
                const passwordMatch = await this.encrypt.compare(vendor.password,vendorFound.password)
                if(passwordMatch){
                    const token = this.jwtCreate.createJwt(vendorFound._id,'vendor')
                    return {
                        status: 200,
                        data: {
                            success :true,
                            message: 'authentication succesfull',
                            vendorId: vendorFound._id,
                            token: token
                        }
                    }
                }
                else{
                    return {
                        status: 200,
                        data: {
                            success :false,
                            message: 'invalid mobile or password',
                        }
                    }
                }
            }
            else{
                return {
                    status: 200,
                    data: {
                        success :false,
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


    async getVendorDetails(vendorId:string){
        try {
            const vendorDetails = await this.vendorRepository.findVendorById(vendorId)
            return{
                status:200,
                data:vendorDetails
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    async changeVendorName(vendorId:string,name:string){
        try {
            const vendorNameChange = await this.vendorRepository.changeVendorName(vendorId,name)
            return{
                status:200,
                data:vendorNameChange
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    //verify otp and change mobile
    async changeMobile(vendorId:string,mobile:string,otp:string,orderId:string){
        try {
            const verifyOtp = await this.twilioService.verifyOtp(mobile, otp,orderId)
            if(verifyOtp){
                const changeMobileStatus = await this.vendorRepository.changeMobile(vendorId,mobile)
                return{
                    status:200,
                    data:changeMobileStatus
                }
            }
            else{
                return{
                    status:200,
                    data:verifyOtp
                }
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    async changePassword(vendorId:string,password:string,currentPassword :string){
        try {
            const vendorFound = await this.vendorRepository.findVendorById(vendorId)
            if(vendorFound){
                const passwordMatch = await this.encrypt.compare(currentPassword,vendorFound.password)
                if(passwordMatch){
                    const hashedPassword = await this.encrypt.createHash(password)
                    const passwordChangeStatus = await this.vendorRepository.changePassword(vendorId,hashedPassword)
                    return{
                        status:200,
                        data:passwordChangeStatus
                    }
                }
                else{
                    return{
                        status:200,
                        data:false
                    }
                }
            }
            else{
                return{
                    status:200,
                    data:false
                }
            }

        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }


    async forgotPasswordChange(mobile:string,password:string){
        try {
            const hashedPassword = await this.encrypt.createHash(password) 
            const passwordChange = await this.vendorRepository.forgotPasswordChange(mobile,hashedPassword)
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
    



}


export default Vendorusecase