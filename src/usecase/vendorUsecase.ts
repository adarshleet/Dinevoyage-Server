import Vendor from "../domain/vendor";
import VendorRepository from "./interface/vendoRepository";
import TwilioService from './../infrastructure/utils/twilio'
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
    

    async vendorLogin(vendor:Vendor){
        try {
            const vendorFound= await this.vendorRepository.mobileExistCheck(vendor.mobile)
            if(vendorFound){
                const passwordMatch = await this.encrypt.compare(vendor.password,vendorFound.password)
                if(passwordMatch){
                    const token = this.jwtCreate.createJwt(vendorFound._id)
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

}


export default Vendorusecase